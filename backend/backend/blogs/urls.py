from django.urls import path
from .views import BlogCreateView, BlogListView, BlogDetailView

urlpatterns = [
    path('saveblog/', BlogCreateView.as_view(), name='create-blog'),
    path('storylist/', BlogListView.as_view(), name='get blog list'),
    path('story/<int:id>/', BlogDetailView.as_view(), name='story-detail'),
]