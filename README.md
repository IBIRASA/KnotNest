# KnotNest

## Project Description

KnotNest is a web application built with Django (backend) and React (frontend) to help people plan their marriage venue based on their budget and location.

## Features

- Venue search
- Responsive UI
  -Docker-based multi-service architecture
  -Infrastructure as Code (IaC) using Terraform

## Project Structure

### Backend/ # Django backend

### Frontend/ # React frontend

### Terraform / # Infrastructure as Code (IaC) using Terraform

### docker-compose.yml # Docker multi-service setup

### Dockerfile(s) # Service-specific Dockerfiles

### README.md # Project documentation

### Backend Setup

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Terraform](https://developer.hashicorp.com/terraform/install)
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

## Running Locally with Docker

```bash
git clone https://github.com/IBIRASA/KnotNest.git
cd KnotNest

```

## Build and run the containers

```bash
docker-compose up --build

```

## stopping container

```bash
docker-compose stop

```

## Infrastructure Delpoyment with Terraform

### Navigate to the terraform directory

```bash
cd terraform

```

### Initialize Terraform

```bash
terraform init

```

### Apply the terraform configuration

```bash
terraform apply

```

## Live URLs
- Frontend: https://knot-frontend.ashysea-fcb2b410.eastus.azurecontainerapps.io
- Backend: https://knot-backend.ashysea-fcb2b410.eastus.azurecontainerapps.io
