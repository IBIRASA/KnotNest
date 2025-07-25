from rest_framework import generics
from .models import Event
from .serializers import EventSerializer

class AvailableEventsAPIView(generics.ListAPIView):
    queryset = Event.objects.filter(is_available=True)
    serializer_class = EventSerializer
class CreateEventAPIView(generics.CreateAPIView):  # New view for POST requests
    queryset = Event.objects.all()
    serializer_class = EventSerializer