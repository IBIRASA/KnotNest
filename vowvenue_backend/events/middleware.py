# middleware.py
import logging

class Ignore404LoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.logger = logging.getLogger('django.server')

    def __call__(self, request):
        response = self.get_response(request)
        if response.status_code == 404:
            # Suppress default 404 log here or customize
            pass
        else:
            self.logger.info(f'{request.method} {request.path} {response.status_code}')
        return response
