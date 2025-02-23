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
        print(serializer.errors)  # Log errors to your console
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def get(self, request, *args, **kwargs):
    def get(self, request, *args, **kwargs):
        tag = request.query_params.get('tag', None)
        if tag:
            posts = Post.objects.filter(tags__name__iexact=tag).order_by("-date_posted")
        else:
            posts = Post.objects.all().order_by("-date_posted")
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
        # posts = Post.objects.all().order_by("-date_posted")
        # serializer = PostSerializer(posts, many=True)
        # return Response(serializer.data)


