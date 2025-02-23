from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()  # This outputs tags as a list of strings

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'image', 'date_posted', 'tags']#'author'