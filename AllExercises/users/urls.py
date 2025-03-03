from django.urls import path
from .views import CreateUserView, LoginUserView, getUserView

urlpatterns = [
    # Add the path for the event submission
    path("users/", CreateUserView.as_view(), name="create-user"),
    path("users/login/", LoginUserView.as_view(), name="login_user"),
    path("users/me/", getUserView.as_view(), name="get_user"),
]
