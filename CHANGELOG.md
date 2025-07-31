## [v1.1.0] - 2025-07-30

### Added

- Continuous deployment pipeline with automated testing and deployment on merge to main branch
- Prometheus monitoring with Grafana dashboards for real-time metrics
- Alerting setup for CPU usage thresholds via Grafana alerts
  -Automated deployment to Azure App Service on push to `main`

### Fixed

- Resolved Docker port conflict issues for Grafana container deployment

### Security

- Integrated automated dependency vulnerability scanning during CI pipeline
- Container image security scanning before pushing to registry

## [v1.0.0] - 2025-07-20

### Added

- Initial release with backend (Django) and frontend (React) applications
- Dockerized microservices: Django backend, React frontend, Prometheus for metrics, Grafana for visualization

## [1.0.1] - 2025-07-31
### Added
- Monitoring with Prometheus and Grafana
- Alert rule for Prometheus uptime notifications

### Changed
- Updated backend metrics endpoint for Prometheus scraping

### Fixed
- Resolved Docker port conflicts for Grafana and Prometheus containers