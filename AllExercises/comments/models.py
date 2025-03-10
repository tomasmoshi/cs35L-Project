from django.db import models
from events.models import Post 
from django.utils import timezone
from django.contrib.auth.models import User

class Comment(models.Model):
    event = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Comment by {self.author} on {self.event}"
