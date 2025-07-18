from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status

from .models import Blog
from .serializers import BlogSerializer

# Blog Create View
class BlogCreateView(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """Override create() to customize success response format"""
        response = super().create(request, *args, **kwargs)
        return Response(
            {
                "message": "Blog created successfully",
                "blog": response.data,
            },
            status=status.HTTP_201_CREATED
        )

# Blog List View
class BlogListView(ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]
    queryset = Blog.objects.all().order_by('-created_at')
