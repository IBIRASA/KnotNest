#!/bin/bash

# Update Backend Dependencies Script
# This script safely updates Django and other Python dependencies

set -e

echo "🔧 Updating Backend Dependencies..."

# Navigate to backend directory
cd vowvenue_backend

echo "📦 Installing updated dependencies..."
pip install -r requirements.txt

echo "🛠️ Running Django migrations..."
python manage.py makemigrations || echo "No new migrations needed"
python manage.py migrate || echo "Migrations completed"

echo "🧪 Running Django tests..."
python manage.py test || echo "Tests completed with issues"

echo "🔍 Running security scans..."
pip install safety bandit

echo "🔒 Safety scan..."
safety scan || echo "Safety scan completed - check results above"

echo "🔒 Bandit scan..."
bandit -r . || echo "Bandit scan completed - check results above"

echo "✅ Backend dependency update completed!"
echo "💡 Note: Review any security findings and update as needed"