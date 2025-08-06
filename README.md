# KnotNest - Wedding Venue Planning Platform

## Project Description

KnotNest is a comprehensive web application built with Django (backend) and React (frontend) to help people plan their wedding venue based on their budget and location. The platform features a modern, responsive design and is deployed using professional DevOps practices with full continuous deployment automation.

## Features

- **Venue Discovery**: Search and filter wedding venues by location
- **Responsive Design**: Mobile-first, responsive UI for all devices
- **Real-time Search**: Fast, dynamic venue search with filtering capabilities

## Architecture

### Technology Stack

- **Frontend**: React 18+ with modern JavaScript (ES6+)
- **Backend**: Django 4+ with Django REST Framework
- **Database**: PostgreSQL
- **Containerization**: Docker and Docker Compose
- **Infrastructure**: Azure Container Apps
- **CI/CD**: GitHub Actions with automated testing and deployment

### Project Structure

```
KnotNest/
├── vow-venue-frontend/          # React frontend application
├── vowvenue_backend/            # Django backend application
├── terraform/                   # Infrastructure as Code (Terraform)
├── monitoring/                  # Monitoring stack (Azure Workbook Monitor)
├── .github/workflows/           # CI/CD pipeline configuration
├── docker-compose.yml           # Local development setup
└── CHANGELOG.md                 # Release history and changes
```

## Development Setup

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- [Node.js](https://nodejs.org/) (v20+) - for local development
- [Python](https://python.org/) (v3.10+) - for local development
- [Git](https://git-scm.com/) for version control

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/IBIRASA/KnotNest.git
cd KnotNest

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3001
# Backend API: http://localhost:8001
```

### Local Development Setup

#### Backend Setup

```bash
cd vowvenue_backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
pip install -r requirements_test.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run development server
python manage.py runserver 8000
```

#### Frontend Setup

```bash
cd vow-venue-frontend
npm install

# Run development server
npm start

```

## Monitoring and Observability

### Monitoring Stack

The application includes comprehensive monitoring using:

- **azure monitor workbooks**: For creating rich, interactive visualization dashboards that display application metrics and health.
- **azure container apps built-in Metrics**: Leveraging the native metrics collected by Azure for container performance (CPU, Memory, Requests, Errors, Replicas).
- **Application logging**: Comprehensive application logs are configured to stream to Azure Log Analytics for detailed analysis and troubleshooting.

### Terraform Deployment

```bash
cd terraform

# Initialize Terraform
terraform init

# Plan infrastructure changes
terraform plan

# Apply infrastructure
terraform apply
```

### Infrastructure Components

- **Azure Resource Group**: `knotnest-rg`
- **Azure Container Registry**: For storing Docker images
- **Azure Container Apps Environment**: Managed container hosting
- **Container Apps**: Separate apps for frontend and backend
- **Networking**: Automatic load balancing and SSL termination

## Continuous Deployment Pipeline

### Pipeline Overview

The CI/CD pipeline is implemented using GitHub Actions and includes:

1. **Build and Test**:
   - Code checkout and dependency installation
   - Unit tests for both frontend and backend
   - Code coverage reporting

2. **Security Scanning**:
   - Dependency vulnerability scanning (npm audit, safety)
   - Static code analysis (bandit for Python)
   - Container image security scanning (Trivy)

3. **Build and Push**:
   - Docker image building with version tagging
   - Multi-registry push (Docker Hub + Azure Container Registry)
   - Container security validation

4. **Deployment**:
   - **Staging**: Automatic deployment on `develop` branch
   - **Production**: Automatic deployment on `main` branch
   - Zero-downtime deployment with health checks

### Pipeline Triggers

- **Staging**: Pushes to `develop` branch
- **Production**: Pushes to `main` branch
- **Testing**: Pull requests to `main` branch

### Security Features

- Automated dependency scanning
- Container vulnerability assessment
- Security report generation and archival
- Non-blocking security checks with detailed reporting

## Release Management

### Conventional Commits

The project follows conventional commit standards:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Maintenance tasks

### Changelog Management

All releases are documented in [CHANGELOG.md](./CHANGELOG.md) with:

- Version information and release dates
- Added features and improvements
- Bug fixes and security updates
- Breaking changes and migration notes

## Security

### Security Practices

- Automated dependency vulnerability scanning
- Container image security analysis
- Static code analysis for security issues
- Secrets management via environment variables
- HTTPS enforcement in production
- Security headers and CORS configuration

### Security Reporting

Security scan results are automatically generated and stored as artifacts:

- Frontend dependency audit reports
- Backend safety and bandit reports
- Container vulnerability assessments
- Security remediation recommendations

## Testing

### Running Tests

```bash
# Backend tests
cd vowvenue_backend
python manage.py test

# Frontend tests
cd vow-venue-frontend
npm test
```

### Test Coverage

- Backend: Django unit tests with database testing
- Frontend: Jest and React Testing Library
- Integration: End-to-end API testing
- Security: Automated vulnerability testing

## Contributing

### Development Workflow

1. Create feature branch from `develop`
2. Implement changes with tests
3. Run local testing and security checks
4. Create pull request to `develop`
5. Automated CI pipeline validation
6. Code review and merge to `develop`
7. Staging deployment and testing
8. Merge to `main` for production deployment

### Code Quality

- ESLint and Prettier for frontend code formatting
- Python Black and flake8 for backend code quality
- Automated testing in CI pipeline
- Security scanning and vulnerability assessment

## Live URLs

### Production Environment

- **Frontend**: https://knot-frontend.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **Backend API**: https://knot-backend.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **video link** : https://youtu.be/vrHrOslYqqs
