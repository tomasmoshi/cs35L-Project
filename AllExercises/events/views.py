from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import json
from .models import Post
from .serializers import PostSerializer

class CreateEventView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # Allow image uploads

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data["tags"] = json.loads(data["tags"])
        print(data["tags"])
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        tag = request.query_params.get("tags", None)
        if tag:
            posts = Post.objects.filter(tags__name__icontains=tag).order_by(
                "-date_posted"
            )
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        else:
            # Fallback: Return all posts or handle differently
            posts = Post.objects.all().order_by("-date_posted")
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
