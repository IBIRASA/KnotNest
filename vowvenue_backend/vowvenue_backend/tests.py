from django.test import TestCase, Client

class APITest(TestCase):
    def test_api_returns_message(self):
        client = Client()
        response = client.get('/api/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Hello from Vow Venue backend!"})
