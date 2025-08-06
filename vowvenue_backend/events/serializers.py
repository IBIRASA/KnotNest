# events/serializers.py

from rest_framework import serializers
from .models import Event # Import the Event model

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'location', 'date', 'is_available'] # 
