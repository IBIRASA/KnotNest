from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    date = models.DateTimeField()
    is_available = models.BooleanField(default=True)  # Correct field name

    def __str__(self):
        return self.title
