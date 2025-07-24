from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status

from .models import Blog
from .serializers import BlogSerializer
from .classify_story import top_3_genres

# Blog Create View
class BlogCreateView(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()

    def perform_create(self, serializer):
        title = self.request.data.get("title", "")
        content = self.request.data.get("content", "")
        text = f"{title}\n{content}"
        genres = top_3_genres(text)
        serializer.save(user=self.request.user, genre_list=genres)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response(
            {
                "message": "Blog created successfully",
                "blog": response.data,
                "genre": response.data.get("genre_list", []),
            },
            status=status.HTTP_201_CREATED
        )


# Blog List View
class BlogListView(ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]
    queryset = Blog.objects.all().order_by('-created_at')


class BlogDetailView(RetrieveAPIView):
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]
    queryset = Blog.objects.all()
    lookup_field = 'id'