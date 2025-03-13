from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(
        upload_to="profile_images/", blank=True, null=True
    )
    biography = models.CharField(max_length=300, blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username} Profile"
