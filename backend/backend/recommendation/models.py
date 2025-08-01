from django.db import models
from django.contrib.auth.models import User

class Tag(models.Model):
    name = models.CharField(max_length=50)

class Story(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    embedding = models.JSONField()  # Stores MiniLM embedding

class UserPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    liked_stories = models.ManyToManyField(Story, blank=True)
    favorite_authors = models.ManyToManyField(User, related_name='fans', blank=True)