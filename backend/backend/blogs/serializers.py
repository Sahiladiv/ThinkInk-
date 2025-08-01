from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='user.username', read_only=True)
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'created_at', 'genre_list', 'likes_count']

    def get_likes_count(self, obj):
        return obj.likes.count()  # assumes a related_name='likes' on the like model

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        return value
