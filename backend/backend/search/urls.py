from django.urls import path
from .views import SearchContentView

urlpatterns = [
    path("search_content", SearchContentView.as_view()),
]
