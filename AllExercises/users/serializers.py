from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    # Allow these fields to be provided by the client.
    username = serializers.CharField(source="user.username")
    password = serializers.CharField(source="user.password", write_only=True)
    email = serializers.EmailField(source="user.email")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "profile_image",
        ]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(**user_data)
        profile = UserProfile.objects.create(user=user, **validated_data)
        return profile


class UserDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    profile_image = serializers.ImageField(read_only=True)
    biography = serializers.CharField(read_only=True)
    class Meta:
        model = UserProfile
        fields = ["id", "username", "email", "first_name", "last_name", "profile_image", "biography"]

class UserEditSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", required=False)
    email = serializers.EmailField(source="user.email", required=False)
    first_name = serializers.CharField(source="user.first_name", required=False)
    last_name = serializers.CharField(source="user.last_name", required=False)
    biography = serializers.CharField(required=False, allow_blank=True)
    profile_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = UserProfile
        fields = ["username", "profile_image", "biography", "email", "first_name", "last_name"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})

        # Update User model fields
        for attr, value in user_data.items():
            setattr(instance.user, attr, value)
        instance.user.save()
        # Handle Image Uploads Separately
        print(validated_data)
        if "profile_image" in validated_data:
            profile_image = validated_data.pop("profile_image")
            if profile_image:
                instance.profile_image = profile_image  # Save new image
            else:
                instance.profile_image = None  # Reset image if null

        # Update remaining UserProfile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
# class UserEditSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source="user.username", required=False)
#     email = serializers.EmailField(source="user.email", required=False)
#     first_name = serializers.CharField(source="user.first_name", required=False)
#     last_name = serializers.CharField(source="user.last_name", required=False)
#     biography = serializers.CharField(required=False)

#     class Meta:
#         model = UserProfile
#         fields = [
#             "username",
#             "profile_image",
#             "biography",
#             "email",
#             "first_name",
#             "last_name",
#         ]

#     def update(self, instance, validated_data):
#         # Update nested user fields
#         user_data = validated_data.pop("user", {})
#         for attr, value in user_data.items():
#             setattr(instance.user, attr, value)
#         instance.user.save()

#         # Update the UserProfile fields
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()

#         return instance


