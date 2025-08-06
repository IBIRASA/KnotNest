from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    date = models.DateField(help_text="Date of the event (YYYY-MM-DD)")
    is_available = models.BooleanField(default=True, help_text="Is this event still available for booking?")
    # Metadata fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['date'] # 
        verbose_name = "Event"
        verbose_name_plural = "Events"