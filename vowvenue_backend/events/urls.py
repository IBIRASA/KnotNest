# events/urls.py

from django.urls import path
from .views import EventListAPIView, CreateEventAPIView # 

urlpatterns = [
    path('venues/', EventListAPIView.as_view(), name='event-list'), #
    path('venues/create/', CreateEventAPIView.as_view(), name='event-create'), # 
]
