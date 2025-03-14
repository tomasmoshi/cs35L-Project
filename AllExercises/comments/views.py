from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from events.models import Post


class CommentViewSet(APIView):

    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.AllowAny]  # Change permissions as needed

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated()]  # Only authenticated users can post
        return [AllowAny()]  # Anyone can view events

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        # Assume the client sends an 'event' field with the Post's ID.
        event_id = data.get("event")
        if not event_id:
            return Response(
                {"error": "Event id is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        event_instance = get_object_or_404(Post, id=event_id)

        # Get the user profile from request.user

        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(author=request.user, event=event_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        event_id = request.query_params.get("event")
        if event_id:
            comments = Comment.objects.filter(event__id=event_id).order_by("-date_posted")
        else:
            comments = Comment.objects.all().order_by("-date_posted")
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
