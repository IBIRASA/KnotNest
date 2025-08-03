from django.http import JsonResponse, HttpResponse
from rest_framework import generics
from .models import Event
from .serializers import EventSerializer
import logging

logger = logging.getLogger(__name__)

def test_api(request):
    # Simple test API that returns a message
    return JsonResponse({"message": "Hello from Vow Venue backend!"})

def home(request):
    logger.info("Home page was accessed")
    return HttpResponse("Welcome to the Vow Venue backend.")

class AvailableEventsAPIView(generics.ListAPIView):
    queryset = Event.objects.filter(is_available=True)
    serializer_class = EventSerializer

    def list(self, request, *args, **kwargs):
        logger.info("GET /available-events called by %s", request.user)
        return super().list(request, *args, **kwargs)

class CreateEventAPIView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        logger.info("POST /create-event called by %s", request.user)
        return super().create(request, *args, **kwargs)
