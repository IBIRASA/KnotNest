# KnotNest

## Project Description

KnotNest is a web application built with Django (backend) and React (frontend) to help people plan their marriage venue based on their budget and location.

## Features

- Venue search and booking
- Responsive UI with modern design
- Docker-based multi-service architecture
- Infrastructure as Code (IaC) using Terraform
- Complete CI/CD pipeline with automated testing and deployment
- Comprehensive monitoring with Prometheus and Grafana
- Security scanning and vulnerability assessment
- Automated deployment to Azure Container Apps

## Live URLs

### Production Environment
- **Frontend**: https://knot-frontend.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **Backend**: https://knot-backend.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **Backend API**: https://knot-backend.ashysea-fcb2b410.eastus.azurecontainerapps.io/api/
- **Health Check**: https://knot-backend.ashysea-fcb2b410.eastus.azurecontainerapps.io/health/

### Staging Environment
- **Frontend**: https://knot-frontend-staging.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **Backend**: https://knot-backend-staging.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **Backend API**: https://knot-backend-staging.ashysea-fcb2b410.eastus.azurecontainerapps.io/api/
- **Health Check**: https://knot-backend-staging.ashysea-fcb2b410.eastus.azurecontainerapps.io/health/

### Monitoring (Local Development)
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin123)
- **Alertmanager**: http://localhost:9093

## CI/CD Pipeline

The project implements a comprehensive CI/CD pipeline with the following stages:

### 1. Security Scanning
- GitLeaks secret scanning
- Bandit SAST for Python code
- Semgrep SAST for multiple languages
- NPM audit for Node.js dependencies
- Safety check for Python dependencies

### 2. Testing
- Backend unit tests with coverage reporting
- Frontend unit tests with coverage reporting
- Integration tests with PostgreSQL

### 3. Build & Container Security
- Docker image building with versioning
- Trivy container security scanning
- Multi-stage builds for optimized images

### 4. Deployment
- **Staging**: Automatic deployment on push to `develop` branch
- **Production**: Automatic deployment on push to `main` branch
- Blue-green deployment strategy
- Health checks and rollback capabilities

## Project Structure

```
KnotNest/
├── vow-venue-frontend/          # React frontend application
├── vowvenue_backend/            # Django backend application
├── terraform/                   # Infrastructure as Code
├── monitoring/                  # Monitoring stack configuration
│   ├── prometheus.yml           # Prometheus configuration
│   ├── alert_rules.yml          # Alerting rules
│   ├── alertmanager.yml         # Alert manager configuration
│   ├── blackbox.yml             # Blackbox exporter config
│   └── grafana/                 # Grafana dashboards and provisioning
├── .github/workflows/           # CI/CD pipeline configuration
├── docker-compose.yml           # Local development setup
├── CHANGELOG.md                 # Version history and changes
└── README.md                    # Project documentation
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Terraform](https://developer.hashicorp.com/terraform/install)
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Node.js 20+](https://nodejs.org/)
- [Python 3.10+](https://www.python.org/downloads/)

## Running Locally with Docker

```bash
git clone https://github.com/IBIRASA/KnotNest.git
cd KnotNest

# Build and run the application containers
docker-compose up --build

# Access the application
# Frontend: http://localhost:3001
# Backend: http://localhost:8001
```

## Running the Monitoring Stack

```bash
cd monitoring
docker-compose up -d

# Access monitoring services
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3000 (admin/admin123)
# Alertmanager: http://localhost:9093
```

## Infrastructure Deployment with Terraform

### Navigate to the terraform directory
```bash
cd terraform
```

### Initialize Terraform
```bash
terraform init
```

### Plan the deployment
```bash
terraform plan
```

### Apply the terraform configuration
```bash
terraform apply
```

This will create:
- Azure Resource Group
- Azure Container Registry
- Azure Container App Environment
- Log Analytics Workspace
- Container Apps for both staging and production

## Development Workflow

1. **Feature Development**: Create feature branches from `develop`
2. **Staging Deployment**: Merge to `develop` branch triggers staging deployment
3. **Production Deployment**: Merge to `main` branch triggers production deployment
4. **Monitoring**: Monitor applications using Grafana dashboards
5. **Alerts**: Receive notifications via configured alert channels

## Security Features

- Automated dependency vulnerability scanning
- Container image security scanning with Trivy
- Static Application Security Testing (SAST)
- Secret scanning with GitLeaks
- Regular security updates through automated pipelines

## Monitoring & Observability

- **Metrics Collection**: Prometheus scraping application metrics
- **Visualization**: Grafana dashboards for application and infrastructure metrics
- **Alerting**: Alertmanager for critical system alerts
- **Health Checks**: Automated health monitoring for all services
- **Log Aggregation**: Centralized logging with Azure Log Analytics

## Version Management

The project follows semantic versioning and maintains a detailed changelog:
- All deployments are automatically versioned
- CHANGELOG.md is updated with each release
- Git tags are created for production releases
- Release notes include deployment information and changes

## Support

For issues and questions:
1. Check the [Issues](https://github.com/IBIRASA/KnotNest/issues) section
2. Review the CHANGELOG.md for recent changes
3. Check monitoring dashboards for system health
4. Review CI/CD pipeline logs for deployment issues
