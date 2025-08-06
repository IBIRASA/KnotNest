# vowvenue_backend/tests.py

from django.test import TestCase
from django.urls import reverse # Import reverse to get URL by name
from rest_framework.test import APIClient
from events.models import Event # Import your Event model

class APITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create some test data for your API to return
        Event.objects.create(
            title="Test Event 1",
            description="Description for test event 1.",
            location="Test Location A",
            date="2025-09-01",
            is_available=True
        )
        Event.objects.create(
            title="Test Event 2",
            description="Description for test event 2.",
            location="Test Location B",
            date="2025-09-05",
            is_available=False
        )

    def test_event_list_api_returns_200_ok(self):
        """
        Ensure the event list API endpoint returns a 200 OK status code
        and contains the expected data.
        """
        # Use reverse to get the URL for your 'event-list' name
        # This is more robust than hardcoding the URL
        url = reverse('event-list')
        response = self.client.get(url) # Make GET request to /api/venues/

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 2) # Check if 2 events are returned (due to pagination)
        self.assertEqual(response.data['results'][0]['title'], "Test Event 1") # Check content
        self.assertEqual(response.data['results'][0]['location'], "Test Location A")

    def test_event_search_api(self):
        """
        Ensure the event search API endpoint filters results correctly.
        """
        url = reverse('event-list') # Use the same list URL for search
        response = self.client.get(f"{url}?search=Location A") # Search for 'Location A'

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], "Test Event 1")

    # You can add more tests here for create, update, delete if you implement those views
    # For example, a test for CreateEventAPIView:
    def test_create_event_api(self):
        """
        Ensure the create event API endpoint successfully creates a new event.
        """
        create_url = reverse('event-create') # Use the 'event-create' URL name
        new_event_data = {
            "title": "New Test Event",
            "description": "A newly created event for testing.",
            "location": "New City",
            "date": "2026-01-01",
            "is_available": True
        }
        response = self.client.post(create_url, new_event_data, format='json')

        self.assertEqual(response.status_code, 201) # 201 Created for successful POST
        self.assertEqual(Event.objects.count(), 3) # Check if total events increased
        self.assertEqual(Event.objects.get(title="New Test Event").location, "New City")

