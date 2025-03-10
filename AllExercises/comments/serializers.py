from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.username", read_only=True)
    event = serializers.CharField(source="event.id", read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'event', 'author', 'content', 'date_posted']
