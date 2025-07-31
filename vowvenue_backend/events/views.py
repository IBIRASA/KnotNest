import logging

logger = logging.getLogger(__name__)
from rest_framework import generics
from .models import Event
from .serializers import EventSerializer


class AvailableEventsAPIView(generics.ListAPIView):
    queryset = Event.objects.filter(is_available=True)
    serializer_class = EventSerializer
    def list(self, request, *args, **kwargs):
        logger.info("GET /available-events called by %s", request.user)
        return super().list(request, *args, **kwargs)
class CreateEventAPIView(generics.CreateAPIView):  # New view for POST requests
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        logger.info("POST /create-event called by %s", request.user)
        return super().create(request, *args, **kwargs)