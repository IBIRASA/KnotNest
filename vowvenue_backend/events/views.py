# events/views.py

from rest_framework import generics
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination
from .models import Event
from .serializers import EventSerializer

# Custom Pagination Class (remains the same)
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100

class EventListAPIView(generics.ListAPIView):
    """
    API view to list and search events with pagination.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title', 'location', 'description']
    pagination_class = StandardResultsSetPagination

class CreateEventAPIView(generics.CreateAPIView):
    """
    API view to create new events.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
