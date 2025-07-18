from django.db import models
from django.contrib.auth.models import User

class Onboarding(models.Model):
    STORY_CHOICES = [
        ('adventure', 'Adventure'),
        ('romance', 'Romance'),
        ('sci-fi', 'Sci-Fi'),
        ('horror', 'Horror'),
        ('mystery', 'Mystery'),
        ('fantasy', 'Fantasy'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='onboarding')
    preferences = models.JSONField(default=list)

    def __str__(self):
        return f"{self.user.username}'s onboarding"
