#!/bin/bash

# Health Check Script for KnotNest Application
# This script verifies that both frontend and backend services are healthy

set -e

# Configuration
FRONTEND_URL="${FRONTEND_URL:-http://localhost:3001}"
BACKEND_URL="${BACKEND_URL:-http://localhost:8001}"
MAX_RETRIES=30
RETRY_INTERVAL=10

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

# Function to check if a URL is responding
check_url() {
    local url=$1
    local service_name=$2
    local retries=0
    
    log "Checking $service_name health at $url"
    
    while [ $retries -lt $MAX_RETRIES ]; do
        if curl -f -s --max-time 10 "$url" >/dev/null 2>&1; then
            log "$service_name is healthy!"
            return 0
        else
            retries=$((retries + 1))
            warn "$service_name not ready (attempt $retries/$MAX_RETRIES)"
            if [ $retries -lt $MAX_RETRIES ]; then
                sleep $RETRY_INTERVAL
            fi
        fi
    done
    
    error "$service_name failed health check after $MAX_RETRIES attempts"
    return 1
}

# Function to check API endpoints
check_api_endpoints() {
    local base_url=$1
    local endpoints=("/api/health/" "/api/venues/" "/admin/")
    
    log "Checking API endpoints..."
    
    for endpoint in "${endpoints[@]}"; do
        local url="$base_url$endpoint"
        if curl -f -s --max-time 10 "$url" >/dev/null 2>&1; then
            log "✓ $endpoint endpoint is accessible"
        else
            warn "✗ $endpoint endpoint is not accessible"
        fi
    done
}

# Function to check frontend resources
check_frontend_resources() {
    local base_url=$1
    
    log "Checking frontend static resources..."
    
    # Check if main page loads
    if curl -f -s --max-time 10 "$base_url" | grep -q "KnotNest\|React" >/dev/null 2>&1; then
        log "✓ Frontend application is loading correctly"
    else
        warn "✗ Frontend application may not be loading correctly"
    fi
}

# Main health check execution
main() {
    log "Starting KnotNest Application Health Check"
    log "Frontend URL: $FRONTEND_URL"
    log "Backend URL: $BACKEND_URL"
    
    local exit_code=0
    
    # Check backend health
    if ! check_url "$BACKEND_URL" "Backend API"; then
        exit_code=1
    else
        check_api_endpoints "$BACKEND_URL"
    fi
    
    # Check frontend health
    if ! check_url "$FRONTEND_URL" "Frontend Application"; then
        exit_code=1
    else
        check_frontend_resources "$FRONTEND_URL"
    fi
    
    # Overall health status
    if [ $exit_code -eq 0 ]; then
        log "🎉 All health checks passed! Application is healthy."
    else
        error "❌ Health checks failed! Please check the logs above."
    fi
    
    exit $exit_code
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --frontend-url)
            FRONTEND_URL="$2"
            shift 2
            ;;
        --backend-url)
            BACKEND_URL="$2"
            shift 2
            ;;
        --max-retries)
            MAX_RETRIES="$2"
            shift 2
            ;;
        --retry-interval)
            RETRY_INTERVAL="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --frontend-url URL    Frontend URL to check (default: http://localhost:3001)"
            echo "  --backend-url URL     Backend URL to check (default: http://localhost:8001)"
            echo "  --max-retries NUM     Maximum number of retries (default: 30)"
            echo "  --retry-interval SEC  Interval between retries in seconds (default: 10)"
            echo "  -h, --help           Show this help message"
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Run the main function
main