from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'created_at']  # added 'author'

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        return value
