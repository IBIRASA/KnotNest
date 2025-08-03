from django.urls import path
from .views import AvailableEventsAPIView ,CreateEventAPIView

urlpatterns = [
    path('available/', AvailableEventsAPIView.as_view(), name='available-events'),
    path('create/', CreateEventAPIView.as_view(), name='create-event'), 
]
