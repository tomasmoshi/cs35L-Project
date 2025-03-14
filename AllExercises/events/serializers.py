from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer
from .models import Post
from users.models import UserProfile 
from comments.serializers import CommentSerializer

class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    author = serializers.CharField(source="author.username", read_only=True)
    author_profile_image = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True) 
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
            "author_profile_image",
            "comments",
            "latitude",
            "longitude",
        ]
    def get_author_profile_image(self, obj):
        try:
            if obj.author.userprofile.profile_image:
                return obj.author.userprofile.profile_image.url
        except UserProfile.DoesNotExist:
            return None
        return None  
