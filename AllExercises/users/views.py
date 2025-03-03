from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import json
from .serializers import UserSerializer
from .models import UserProfile


# Create your views here.
class CreateUserView(APIView, UserCreationForm):
    parser_classes = (MultiPartParser, FormParser)  # Allow image uploads

    def post(self, request, *args, **kwargs):
        user = request.data
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print(user)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        user = UserProfile()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)
