Security Policy and Vulnerability Management
This document outlines the security scanning practices implemented in the KnotNest CI/CD pipeline and the procedures for reviewing and remediating identified vulnerabilities.

1. Automated Security Scanning Tools
   Our CI/CD pipelines integrate automated security scans to identify potential vulnerabilities in dependencies, code, and container images.

Dependency Vulnerability Scanning:

Frontend (React): npm audit is used to identify known vulnerabilities in Node.js packages.

Backend (Django): Bandit is used for static analysis to find common security issues in Python code.

Container Image Security Scanning:

Frontend & Backend Images: Trivy is used to scan container images for operating system packages and application dependencies vulnerabilities after they are built and pushed to Azure Container Registry (ACR).

2. Review Process for Security Scan Results
   Security scan results are reviewed regularly to ensure the ongoing security of the KnotNest application.

Pipeline Output Review:

On every successful merge to the main branch (which triggers full deployment), the output of npm audit (frontend), Bandit (backend), and Trivy (both images) in the GitHub Actions workflow logs must be reviewed.

For Bandit, a bandit_report.json artifact is generated and can be downloaded from the backend CI/CD pipeline run details for a more structured review.

Prioritization:

CRITICAL and HIGH severity vulnerabilities identified by any scan tool must be prioritized for immediate remediation.

Medium and Low severity issues should be tracked and addressed in subsequent development cycles.

3. Remediation Guidelines
   Once vulnerabilities are identified, the following steps should be taken for remediation:

Dependency Updates:

For npm audit findings, attempt to update the vulnerable packages to a version where the vulnerability is resolved. Use npm update or npm install <package>@<version> to specifically target updates.

For Bandit findings, review the flagged code and refactor it to remove the security flaw, following secure coding best practices.

For Python dependencies, update requirements.txt to newer, secure versions of libraries.

Container Image Updates:

If Trivy identifies vulnerabilities in the base image (e.g., python:3.12-slim-bookworm or nginx:alpine), our primary strategy is to:

Ensure the latest slim or alpine variant of the chosen base image is used in the Dockerfile.

Include apt-get upgrade -y (for Debian-based) or apk upgrade (for Alpine-based) in the Dockerfile to apply all available OS-level patches.

Force Docker builds to bypass cache using --no-cache in the CI/CD pipeline to ensure the freshest base image layers are pulled.

Code Fixes:

For direct code vulnerabilities (e.g., from Bandit), implement the necessary code changes to eliminate the vulnerability.

Testing:

After any security fix, ensure that existing automated tests (unit, integration) are run to prevent regressions.

Consider adding new tests specifically for the patched vulnerability if applicable.

4. Current Vulnerability Status and Mitigation Strategy
   Despite implementing best practices for base image selection, package upgrades, and cache-busting, the Trivy scans for the knotnest_backend:latest image (based on python:3.12-slim-bookworm) currently show 223 vulnerabilities (2 Critical, 221 High) in the underlying debian 12.11 operating system layer.

These persistent vulnerabilities are primarily due to:

will_not_fix or fix_deferred status: Many reported vulnerabilities have a status indicating that patches are not available or will not be applied by the Debian maintainers.

Timing of patches: Patches for some very recent vulnerabilities may not yet be integrated into the official Docker base images.

Low practical exploitability: While reported, some vulnerabilities might have a low practical exploitability in the context of our specific application.

Mitigation Strategy for Persistent Base Image Vulnerabilities:

Given that these vulnerabilities are in the base OS and are not directly fixable by application code changes or simple dependency updates, our strategy is to:

Monitor Regularly: Continue to run Trivy scans with every deployment to main. We will monitor for new patches becoming available in subsequent base image updates.

Evaluate Risk: For critical/high vulnerabilities without a fix, we will assess their actual exploitability within the context of the KnotNest application. If a vulnerability poses a significant, demonstrable risk, further investigation into alternative base images or custom patching might be considered.

Layered Security: Rely on other layers of security (e.g., Azure Container Apps' built-in security features, network security groups, Web Application Firewalls if implemented) to mitigate risks that cannot be addressed at the image level.

Acceptance of Residual Risk: Acknowledge that a certain level of residual vulnerability in base OS components is common and acceptable, provided the most critical and exploitable issues are addressed or mitigated by other means.

5. Reporting and Tracking
   All identified vulnerabilities and their remediation status should be tracked (e.g., in GitHub Issues, if applicable) to ensure they are addressed.

Significant security updates and fixes should be noted in the CHANGELOG.md file under the Fixed section.
