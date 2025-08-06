Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial setup for backend and frontend CI/CD pipelines.
- Integrated npm audit for frontend dependency scanning.
- Integrated Bandit for backend static code analysis.
- Added manual workflow dispatch triggers.
- Configured CORS for frontend-backend communication.
- Implemented basic console logging for backend application.
- Created Azure Monitor Dashboard for application health.
- Established `SECURITY.md` for DevSecOps documentation.

### Fixed

- Resolved Docker login authentication issues with ACR.
- Corrected YAML parsing errors in workflow files.
- Fixed frontend build error (prettier/prettier newline).
- Ensured backend Container App scales to minimum 1 replica.
- Corrected backend deployment action to include acrName.
- Corrected Dockerfile RUN command syntax for both frontend and backend.
- Updated frontend `Eventslist.js` to use `REACT_APP_API_BASE_URL`.
- Applied OS security patches in backend Dockerfile (`apt-get upgrade`).
- Applied OS security patches in frontend Dockerfile (`apk upgrade`).
- Used valid `node:20-slim` base image for frontend Dockerfile.

### Changed

- Updated `REACT_APP_API_BASE_URL` to point to Azure backend.
- Upgraded backend Dockerfile to use `python:3.12-slim-bookworm` base image.
- Switched frontend Dockerfile to multi-stage build with `nginx:alpine`.
- Removed Trivy container image scanning from pipelines and documentation.

## [0.1.0] - 2025-08-06

### Added

- Initial project setup.
- Basic Django backend and React frontend.
- Initial CI/CD workflow files.
