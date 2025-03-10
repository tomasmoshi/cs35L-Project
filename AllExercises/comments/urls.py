from django.urls import path
from .views import CommentViewSet

urlpatterns = [
    # Add the path for the event submission
    path("comments/", CommentViewSet.as_view(), name="create-comment"),
]
