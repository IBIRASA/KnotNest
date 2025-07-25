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

resource "azurerm_container_app_environment" "knot_env" {
  name                = "knot-env"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

resource "azurerm_container_app" "backend" {
  name                         = "knot-backend"
  container_app_environment_id = azurerm_container_app_environment.knot_env.id
  resource_group_name          = azurerm_resource_group.example.name

  revision_mode = "Single"

  template {
    container {
      name   = "backend"
      image  = "${azurerm_container_registry.acr.login_server}/knotnest_backend:latest"
      cpu    = 0.5
      memory = "1.0Gi"
      
      env {
        name  = "PORT"
        value = "8000"
      }
    }
  }

  ingress {
    external_enabled = true
    target_port      = 8000

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-password"
  }

  secret {
    name  = "acr-password"
    value = azurerm_container_registry.acr.admin_password
  }
}

resource "azurerm_container_app" "frontend" {
  name                         = "knot-frontend"
  container_app_environment_id = azurerm_container_app_environment.knot_env.id
  resource_group_name          = azurerm_resource_group.example.name

  revision_mode = "Single"

  template {
    container {
      name   = "frontend"
      image  = "knotcontaineracr123.azurecr.io/knotnest_frontend:latest" 
      cpu    = 0.5
      memory = "1.0Gi"
    }
  }

  ingress {
    external_enabled = true
    target_port      = 80

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-password"
  }

  secret {
    name  = "acr-password"
    value = azurerm_container_registry.acr.admin_password
  }
}
