from django.urls import path
from .views import BlogCreateView, BlogListView

urlpatterns = [
    path('saveblog/', BlogCreateView.as_view(), name='create-blog'),
    path('storylist/', BlogListView.as_view(), name='get blog list'),
]