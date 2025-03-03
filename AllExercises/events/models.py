from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from taggit.managers import TaggableManager

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to="event_images/", null=True, blank=True)
    # author = models.ForeignKey(
    #     User, on_delete=models.CASCADE
    # )  # models.CASCADE will delete all the posts for a user when the user is deleted
    tags = TaggableManager()  # Adds tagging support

    def __str__(self):
        return self.title
