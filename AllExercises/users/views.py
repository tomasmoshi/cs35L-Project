from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import json
from .serializers import UserSerializer, UserDetailSerializer
from .models import UserProfile
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated


# Create your views here.


class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Retrieve credentials from the request data
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "token": token.key,
                    "username": user.username,
                    "success": True,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
            )


class CreateUserView(APIView, UserCreationForm):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)  # Allow image uploads

    def post(self, request, *args, **kwargs):
        user_data = request.data
        serializer = UserSerializer(data=user_data)
        try:
            if serializer.is_valid():
                # Save the user profile and nested user
                profile = serializer.save()
                # Create or retrieve the token for the new user
                token, created = Token.objects.get_or_create(user=profile.user)

                # Prepare response data with token included
                response_data = serializer.data
                response_data["token"] = token.key
                response_data["username"] = profile.user.username
                response_data["success"] = True
                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                # Return serializer errors if data is invalid
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error:", e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetUserView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)  # Support file uploads

    def get(self, request, *args, **kwargs):
        """Retrieve the logged-in user's profile."""
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = UserDetailSerializer(user_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, *args, **kwargs):
        """Update the logged-in user's profile."""
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = UserDetailSerializer(
                user_profile, data=request.data, partial=True
            )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND
            )
