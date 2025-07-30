from django.http import JsonResponse
import logging
logger = logging.getLogger(__name__)
def test_api(request):
    return JsonResponse({"message": "Hello from Vow Venue backend!"})

def home(request):
    logger.info("Home page was accessed")
    return render(request, 'home.html')
