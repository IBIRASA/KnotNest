terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.74"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "knotnest-rg"
  location = "East US"
}

resource "azurerm_container_registry" "acr" {
  name                = "knotcontaineracr123"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_log_analytics_workspace" "main" {
  name                = "knot-logs"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "knot_env" {
  name                = "knot-env"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
}

# Production Backend Container App
resource "azurerm_container_app" "backend" {
  name                         = "knot-backend"
  container_app_environment_id = azurerm_container_app_environment.knot_env.id
  resource_group_name          = azurerm_resource_group.example.name

  revision_mode = "Single"

  template {
    container {
      name   = "backend"
      image  = "ibirasa/vowvenue-backend:latest"
      cpu    = 0.5
      memory = "1.0Gi"
      
      env {
        name  = "PORT"
        value = "8000"
      }
      
      env {
        name  = "ENVIRONMENT"
        value = "production"
      }
    }

    min_replicas = 1
    max_replicas = 5
  }

  ingress {
    external_enabled = true
    target_port      = 8000
    
    traffic_weight {
      percentage = 100
      latest_revision = true
    }
  }
}

# Production Frontend Container App
resource "azurerm_container_app" "frontend" {
  name                         = "knot-frontend"
  container_app_environment_id = azurerm_container_app_environment.knot_env.id
  resource_group_name          = azurerm_resource_group.example.name

  revision_mode = "Single"

  template {
    container {
      name   = "frontend"
      image  = "ibirasa/vowvenue-frontend:latest"
      cpu    = 0.25
      memory = "0.5Gi"
      
      env {
        name  = "REACT_APP_API_URL"
        value = "https://${azurerm_container_app.backend.latest_revision_fqdn}"
      }
      
      env {
        name  = "ENVIRONMENT"
        value = "production"
      }
    }

    min_replicas = 1
    max_replicas = 3
  }

  ingress {
    external_enabled = true
    target_port      = 80
    
    traffic_weight {
      percentage = 100
      latest_revision = true
    }
  }
}

# Staging Backend Container App
resource "azurerm_container_app" "backend_staging" {
  name                         = "knot-backend-staging"
  container_app_environment_id = azurerm_container_app_environment.knot_env.id
  resource_group_name          = azurerm_resource_group.example.name

  revision_mode = "Single"

  template {
    container {
      name   = "backend"
      image  = "ibirasa/vowvenue-backend:latest"
      cpu    = 0.25
      memory = "0.5Gi"
      
      env {
        name  = "PORT"
        value = "8000"
      }
      
      env {
        name  = "ENVIRONMENT"
        value = "staging"
      }
    }

    min_replicas = 1
    max_replicas = 2
  }

  ingress {
    external_enabled = true
    target_port      = 8000
    
    traffic_weight {
      percentage = 100
      latest_revision = true
    }
  }
}

# Staging Frontend Container App
resource "azurerm_container_app" "frontend_staging" {
  name                         = "knot-frontend-staging"
  container_app_environment_id = azurerm_container_app_environment.knot_env.id
  resource_group_name          = azurerm_resource_group.example.name

  revision_mode = "Single"

  template {
    container {
      name   = "frontend"
      image  = "ibirasa/vowvenue-frontend:latest"
      cpu    = 0.25
      memory = "0.5Gi"
      
      env {
        name  = "REACT_APP_API_URL"
        value = "https://${azurerm_container_app.backend_staging.latest_revision_fqdn}"
      }
      
      env {
        name  = "ENVIRONMENT"
        value = "staging"
      }
    }

    min_replicas = 1
    max_replicas = 2
  }

  ingress {
    external_enabled = true
    target_port      = 80
    
    traffic_weight {
      percentage = 100
      latest_revision = true
    }
  }
}
