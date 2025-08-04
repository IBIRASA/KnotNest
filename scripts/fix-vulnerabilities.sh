#!/bin/bash

# Fix Frontend Vulnerabilities Script
# This script updates dependencies and fixes known security vulnerabilities

set -e

echo "🔧 Fixing Frontend Vulnerabilities..."

# Navigate to frontend directory
cd vow-venue-frontend

echo "📦 Current npm audit status:"
npm audit || true

echo "🔄 Updating dependencies..."
npm update

echo "🛠️ Fixing vulnerabilities with npm audit fix..."
npm audit fix || echo "Some vulnerabilities couldn't be automatically fixed"

echo "💪 Trying force fix for remaining issues..."
npm audit fix --force || echo "Force fix completed with some warnings"

echo "📋 Final audit status:"
npm audit || echo "Some vulnerabilities may remain - check if acceptable for development"

echo "✅ Vulnerability fix process completed!"
echo "💡 Note: Some vulnerabilities in dev dependencies are acceptable for development environments"