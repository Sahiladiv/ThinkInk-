from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status

from .models import Blog
from .serializers import BlogSerializer
from .classify_story import top_3_genres
from .create_add_vector_database import add_in_chroma_db

class BlogCreateView(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()

    def perform_create(self, serializer):
        title = self.request.data.get("title", "")
        content = self.request.data.get("content", "")
        full_text = f"{title}\n{content}"
        genres = top_3_genres(full_text)
        blog = serializer.save(user=self.request.user, genre_list=genres)

        content_to_embed = (
            f"Author: {blog.user.username}\n"
            f"Title: {blog.title}\n"
            f"Genres: {', '.join(blog.genre_list)}\n"
            f"Content:\n{blog.content}"
        )

        add_in_chroma_db(blog, content_to_embed)



    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response(
            {
                "message": "Blog created successfully",
                "blog": response.data,
                "genre": response.data.get("genre_list", []),
                "likes_count": response.data.get("likes_count", 0)
            },
            status=status.HTTP_201_CREATED
        )


class BlogListView(ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]
    queryset = Blog.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response({
            "blogs": response.data,
            "count": len(response.data)
        })


class BlogDetailView(RetrieveAPIView):
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]
    queryset = Blog.objects.all()
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return Response({
            "blog": response.data,
            "likes_count": response.data.get("likes_count", 0),
            "genre": response.data.get("genre_list", [])
        })




from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Blog, StoryLike

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like(request, story_id):
    print("ingu4ngn")
    user = request.user
    try:
        blog = Blog.objects.get(id=story_id)
        
    except Blog.DoesNotExist:
        return Response({'error': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)

    like_obj, created = StoryLike.objects.get_or_create(user=user, story=blog)
    if not created:
        like_obj.delete()
        return Response({'message': 'Unliked', 'likes': blog.likes.count()})
    return Response({'message': 'Liked', 'likes': blog.likes.count()})
