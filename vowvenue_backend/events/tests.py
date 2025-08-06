# events/tests.py

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Event # 

class APITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create distinct test data to avoid accidental search matches
        Event.objects.create(
            title="Summer Wedding Fair",
            description="A grand exhibition for wedding planning in Kigali.",
            location="Kigali Convention Centre",
            date="2025-09-01",
            is_available=True
        )
        Event.objects.create(
            title="Autumn Bridal Showcase",
            description="An intimate showcase of bridal wear in Musanze.",
            location="Musanze Event Hall",
            date="2025-10-15",
            is_available=True
        )
        Event.objects.create(
            title="Winter Gala Night",
            description="A festive evening with entertainment in Kigali.",
            location="Kigali Serena Hotel",
            date="2025-12-01",
            is_available=False
        )

    def test_event_list_api_returns_200_ok(self):
        """
        Ensure the event list API endpoint returns a 200 OK status code
        and contains the expected number of results.
        """
        url = reverse('event-list') # This should resolve to /api/venues/
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        # We created 3 events, so expect count to be 3 (before pagination limits)
        self.assertEqual(response.data['count'], 3)
        # Due to pagination_class = StandardResultsSetPagination (page_size=6),
        # all 3 events will be in the first page's results.
        self.assertEqual(len(response.data['results']), 3)
        self.assertEqual(response.data['results'][0]['title'], "Summer Wedding Fair")

    def test_event_search_by_title(self):
        """
        Ensure searching by event title returns correct results.
        """
        url = reverse('event-list')
        response = self.client.get(f"{url}?search=Wedding Fair") # Search for a unique part of title

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['count'], 1) # Expect only one result
        self.assertEqual(response.data['results'][0]['title'], "Summer Wedding Fair")

    def test_event_search_by_location(self):
        """
        Ensure searching by event location returns correct results.
        """
        url = reverse('event-list')
        response = self.client.get(f"{url}?search=Musanze") # Search for a unique location

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['title'], "Autumn Bridal Showcase")

    def test_create_event_api(self):
        """
        Ensure the create event API endpoint successfully creates a new event.
        """
        create_url = reverse('event-create')
        new_event_data = {
            "title": "New Conference",
            "description": "A test conference event.",
            "location": "Virtual",
            "date": "2026-03-10",
            "is_available": True
        }
        response = self.client.post(create_url, new_event_data, format='json')

        self.assertEqual(response.status_code, 201) # 201 Created for successful POST
        self.assertEqual(Event.objects.count(), 4) # Check if total events increased (3 initial + 1 new)
        self.assertEqual(Event.objects.get(title="New Conference").location, "Virtual")

