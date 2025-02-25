from rest_framework import serializers
from django.contrib.auth.models import User

from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    # Allow these fields to be provided by the client.
    username = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password', write_only=True)
    email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source = 'user.first_name')
    last_name = serializers.CharField(source = 'user.last_name')
    
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
    
    def create(self, validated_data):
        # Extract nested user data.
        user_data = validated_data.pop('user')
        # Create the User with the provided data.
        user = User.objects.create_user(**user_data)
        # Create the profile linked to the user.
        profile = UserProfile.objects.create(user=user, **validated_data)
        return profile
