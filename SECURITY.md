## Dependency Scanning

We use the following tools to scan and monitor dependency vulnerabilities:

- **Frontend (npm)**: `npm audit`
- **Backend (Python)**: `pip-audit` or `safety`
- These scans are integrated into our CI/CD pipeline and run on every push to `main`
## CI/CD Pipeline Integration

Security checks are enforced within the GitHub Actions workflow:
- Dependency audit
- Container scan
- Automated test suite