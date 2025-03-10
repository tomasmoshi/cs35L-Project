from django.db import models
from events.models import Post 
from django.utils import timezone

class Comment(models.Model):
    event = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(
        on_delete=models.SET_NULL,
    )
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Comment by {self.user} on {self.event}"
