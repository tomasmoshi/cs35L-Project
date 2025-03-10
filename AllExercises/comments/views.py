from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.views import APIView

class CommentViewSet(APIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]  # Change permissions as needed

    def get_queryset(self,request):
        queryset = Comment.objects.all().order_by('-date')
        event_id = self.request.query_params.get('event')
        if event_id:
            queryset = queryset.filter(event__id=event_id)
        return queryset

    def perform_create(self, serializer):
        # If a user is authenticated, associate the comment with them.
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)
