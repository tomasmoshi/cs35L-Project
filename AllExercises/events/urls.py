from django.urls import path
from .views import CreateEventView

urlpatterns = [
    # Add the path for the event submission
    path('events/', CreateEventView.as_view(), name='create-event'),
]