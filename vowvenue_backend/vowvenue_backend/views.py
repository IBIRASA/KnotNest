from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.conf import settings
from django.db import connection
import logging
import time
import os

logger = logging.getLogger(__name__)

def test_api(request):
    return JsonResponse({"message": "Hello from Vow Venue backend!"})

def my_view(request):
    logger.info("my_view was accessed by: %s", request.user)
    return HttpResponse("Logged successfully.")

def home(request):
    logger.info("Home page was accessed")
    return JsonResponse({
        "service": "KnotNest Backend",
        "status": "running",
        "environment": os.getenv('ENVIRONMENT', 'development'),
        "version": "1.0.0"
    })

def health_check(request):
    """Health check endpoint for monitoring and load balancer"""
    try:
        # Check database connectivity
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            
        return JsonResponse({
            "status": "healthy",
            "service": "vowvenue-backend",
            "timestamp": time.time(),
            "environment": os.getenv('ENVIRONMENT', 'development'),
            "database": "connected",
            "version": "1.0.0"
        }, status=200)
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return JsonResponse({
            "status": "unhealthy",
            "service": "vowvenue-backend",
            "timestamp": time.time(),
            "environment": os.getenv('ENVIRONMENT', 'development'),
            "database": "disconnected",
            "error": str(e),
            "version": "1.0.0"
        }, status=503)

def metrics(request):
    """Prometheus metrics endpoint"""
    # Simple metrics - can be enhanced with django-prometheus package
    metrics_text = f"""# HELP vowvenue_backend_requests_total Total number of requests
# TYPE vowvenue_backend_requests_total counter
vowvenue_backend_requests_total {{method="GET"}} 1

# HELP vowvenue_backend_up Service uptime
# TYPE vowvenue_backend_up gauge
vowvenue_backend_up 1

# HELP vowvenue_backend_response_time Response time in seconds
# TYPE vowvenue_backend_response_time histogram
vowvenue_backend_response_time {{le="0.1"}} 1
vowvenue_backend_response_time {{le="0.5"}} 1
vowvenue_backend_response_time {{le="1.0"}} 1
vowvenue_backend_response_time {{le="+Inf"}} 1
vowvenue_backend_response_time_sum 0.05
vowvenue_backend_response_time_count 1
"""
    return HttpResponse(metrics_text, content_type='text/plain')
    
