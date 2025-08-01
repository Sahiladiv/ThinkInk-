from django.urls import path
from .views import BlogCreateView, BlogListView, BlogDetailView, toggle_like

urlpatterns = [
    path('saveblog/', BlogCreateView.as_view(), name='create-blog'),
    path('storylist/', BlogListView.as_view(), name='get blog list'),
    path('story/<int:id>/', BlogDetailView.as_view(), name='story-detail'),
    path('story/<int:story_id>/like/', toggle_like, name='toggle-like'),
]