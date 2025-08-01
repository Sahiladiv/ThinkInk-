from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()  # stores HTML content
    created_at = models.DateTimeField(auto_now_add=True)
    genre_list = models.TextField(default=list)


class StoryLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    story = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'story')