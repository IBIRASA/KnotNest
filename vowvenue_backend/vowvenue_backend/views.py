from django.http import JsonResponse,HttpResponse
from django.shortcuts import render
import logging
logger = logging.getLogger(__name__)
def test_api(request):
    return JsonResponse({"message": "Hello from Vow Venue backend!"})
def my_view(request):
    logger.info("my_view was accessed by: %s", request.user)
    return HttpResponse("Logged successfully.")
def home(request):
    logger.info("Home page was accessed")
    
