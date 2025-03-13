from django.urls import path
from .views import CreateUserView, LoginUserView, GetUserView, EditUserView

urlpatterns = [
    # Add the path for the event submission
    path("users/", CreateUserView.as_view(), name="create-user"),
    path("users/login/", LoginUserView.as_view(), name="login_user"),
    path("users/me/", GetUserView.as_view(), name="get_user"),
    path("users/me/edit/", EditUserView.as_view(), name="edit_user"),
]
