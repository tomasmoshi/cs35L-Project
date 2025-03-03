from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer
from .models import Post
from django.contrib.auth.models import User

# class PostUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         # Include the fields you want to display for the author.
#         fields = ['username']
        
class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    author = serializers.CharField(source="author.username", read_only=True)
    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "content",
            "image",
            "date_posted",
            "tags",
            "author",
        ]
