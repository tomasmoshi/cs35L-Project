from django.urls import path
from .views import CreateUserView

urlpatterns = [
    # Add the path for the event submission
    path("users/", CreateUserView.as_view(), name="create-user"),
]