from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from taggit.managers import TaggableManager
from users.models import UserProfile

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to="event_images/", null=True, blank=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE
    )  # models.CASCADE will delete all the posts for a user when the user is deleted
    tags = TaggableManager()  # Adds tagging support

    def author_profile_image(self):
        try:
            return self.author.userprofile.profile_image.url if self.author.userprofile.profile_image else None
        except UserProfile.DoesNotExist:
            return None
        
    def __str__(self):
        return self.title
