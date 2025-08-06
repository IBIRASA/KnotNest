import logging
class Skip404Filter(logging.Filter):
    def filter(self, record):
        # Skip 404 "Not Found" error logs
        if record.levelname == 'ERROR' and 'Not Found' in record.getMessage():
            return False
        return True
