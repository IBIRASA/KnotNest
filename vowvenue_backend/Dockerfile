# Use a minimal Python image based on Debian Bookworm (Debian 12)
# 'slim' images are smaller and have fewer pre-installed packages, reducing attack surface.
FROM python:3.10-slim-bookworm

# Set the working directory in the container
WORKDIR /app

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies required for psycopg2-binary (if needed) and other tools
# Use --no-install-recommends to avoid installing unnecessary packages
# Clean up apt cache to keep image size small
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and setuptools to their latest versions to address known vulnerabilities
# This should help with the setuptools vulnerabilities identified by Trivy
RUN pip install --upgrade pip setuptools

# Copy the requirements file into the working directory
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code into the working directory
COPY . /app/

# Expose the port your Django application runs on (default for Django is 8000)
EXPOSE 8000

# Command to run the Django application using Gunicorn (recommended for production)
# Make sure you have gunicorn in your requirements.txt
# If you don't have gunicorn, you can use: CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# Replace 'your_project_name' with the actual name of your Django project (the folder containing settings.py, urls.py)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "vowvenue_backend.wsgi:application"]
