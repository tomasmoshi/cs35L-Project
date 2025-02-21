from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Post
from .serializers import PostSerializer

class CreateEventView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # Allow image uploads

    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all().order_by("-date_posted")
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


