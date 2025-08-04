# Deployment Guide

## Overview

This guide explains how to set up and manage the automated Continuous Deployment (CD) pipeline for KnotNest. The system automatically deploys to staging on `develop` branch commits and to production on `main` branch commits.

## Prerequisites Setup

### 1. Azure Environment Setup

```bash
# Login to Azure CLI
az login

# Create service principal for GitHub Actions
az ad sp create-for-rbac --name "KnotNest-GitHub-Actions" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/knotnest-rg \
  --sdk-auth
```

### 2. GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AZURE_CREDENTIALS` | Azure service principal JSON | Output from `az ad sp create-for-rbac` |
| `DOCKER_USERNAME` | Docker Hub username | `your-dockerhub-username` |
| `DOCKER_PASSWORD` | Docker Hub password/token | `your-dockerhub-token` |

### 3. Infrastructure Deployment

```bash
# Clone the repository
git clone https://github.com/IBIRASA/KnotNest.git
cd KnotNest

# Deploy infrastructure
cd terraform
terraform init
terraform plan
terraform apply
```

## Deployment Workflow

### Staging Deployment (develop branch)

1. Create feature branch from `develop`
2. Make your changes
3. Push to feature branch
4. Create PR to `develop`
5. Merge PR → Automatic staging deployment

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature
# Make changes
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature
# Create PR via GitHub UI
```

### Production Deployment (main branch)

1. Create PR from `develop` to `main`
2. Review and approve
3. Merge PR → Automatic production deployment

```bash
# After staging testing is complete
git checkout develop
git pull origin develop
git checkout main
git pull origin main
git merge develop
git push origin main
```

## Pipeline Stages

### 1. Security Scanning (Parallel)
- **GitLeaks**: Secret detection
- **Bandit**: Python SAST
- **Semgrep**: Multi-language SAST
- **Duration**: ~2-3 minutes

### 2. Testing (After Security)
- **Backend Tests**: Django unit tests with coverage
- **Frontend Tests**: React unit tests with coverage
- **Database Integration**: PostgreSQL tests
- **Duration**: ~3-5 minutes

### 3. Dependency Scanning (Parallel with Testing)
- **Safety**: Python dependency vulnerabilities
- **NPM Audit**: Node.js dependency vulnerabilities
- **Duration**: ~1-2 minutes

### 4. Build & Container Security
- **Docker Build**: Versioned image creation
- **Trivy Scan**: Container vulnerability assessment
- **Registry Push**: Docker Hub image upload
- **Duration**: ~5-8 minutes

### 5. Deployment
- **Staging**: Deploy to staging environment (develop branch)
- **Production**: Deploy to production environment (main branch)
- **Health Checks**: Verify deployment success
- **Duration**: ~3-5 minutes

## Monitoring & Alerting

### Monitoring Stack Setup

```bash
# Start monitoring locally
cd monitoring
docker-compose up -d

# Access monitoring services
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3000 (admin/admin123)
# Alertmanager: http://localhost:9093
```

### Key Metrics Monitored

- **Application Health**: Service uptime and availability
- **Performance**: Response times and throughput
- **Errors**: Error rates and failure patterns
- **Infrastructure**: CPU, memory, disk usage
- **Security**: Vulnerability scan results

### Alert Configuration

Update `monitoring/alertmanager.yml` with your notification channels:

```yaml
# Slack integration
slack_configs:
  - api_url: 'YOUR_SLACK_WEBHOOK_URL'
    channel: '#alerts-critical'

# Email integration
email_configs:
  - to: 'admin@your-domain.com'
    subject: 'CRITICAL: {{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'
```

## Environment URLs

### Production
- **Frontend**: https://knot-frontend.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **Backend**: https://knot-backend.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **Health Check**: https://knot-backend.ashysea-fcb2b410.eastus.azurecontainerapps.io/health/

### Staging
- **Frontend**: https://knot-frontend-staging.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **Backend**: https://knot-backend-staging.ashysea-fcb2b410.eastus.azurecontainerapps.io
- **Health Check**: https://knot-backend-staging.ashysea-fcb2b410.eastus.azurecontainerapps.io/health/

## Troubleshooting

### Common Issues

#### 1. Deployment Failures
```bash
# Check GitHub Actions logs
# View Azure Container App logs
az containerapp logs show --name knot-backend --resource-group knotnest-rg

# Manually trigger deployment
gh workflow run main.yml
```

#### 2. Security Scan Failures
```bash
# View security reports in GitHub Actions artifacts
# Update dependencies to fix vulnerabilities
npm audit fix
pip install --upgrade package-name
```

#### 3. Health Check Failures
```bash
# Check application logs
az containerapp logs show --name knot-backend --resource-group knotnest-rg --follow

# Verify environment variables
az containerapp show --name knot-backend --resource-group knotnest-rg
```

### Manual Deployment (Emergency)

```bash
# Build and push images manually
docker build -t ibirasa/vowvenue-frontend:emergency ./vow-venue-frontend
docker build -t ibirasa/vowvenue-backend:emergency ./vowvenue_backend
docker push ibirasa/vowvenue-frontend:emergency
docker push ibirasa/vowvenue-backend:emergency

# Update container apps
az containerapp update \
  --name knot-backend \
  --resource-group knotnest-rg \
  --image ibirasa/vowvenue-backend:emergency
```

## Best Practices

### 1. Development Workflow
- Always test in staging before production
- Use feature branches for development
- Write meaningful commit messages
- Include tests for new features

### 2. Security
- Never commit secrets to the repository
- Regularly update dependencies
- Monitor security scan results
- Follow least privilege principle

### 3. Monitoring
- Set up appropriate alert thresholds
- Monitor application performance regularly
- Review logs for anomalies
- Maintain monitoring dashboard health

### 4. Release Management
- Follow semantic versioning
- Maintain detailed changelog
- Tag releases appropriately
- Document breaking changes

## Support

For deployment issues:

1. **Check Monitoring**: Review Grafana dashboards and Prometheus alerts
2. **Review Logs**: Check GitHub Actions logs and Azure Container App logs
3. **Verify Health**: Use health check endpoints to verify service status
4. **Escalate**: Contact the development team if issues persist

### Emergency Contacts
- **Development Team**: dev@knotnest.com
- **DevOps Team**: devops@knotnest.com
- **Security Team**: security@knotnest.com