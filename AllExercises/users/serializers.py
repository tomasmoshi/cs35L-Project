from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ["__all__"]
