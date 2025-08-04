output "production_backend_url" {
  value = "https://${azurerm_container_app.backend.latest_revision_fqdn}"
  description = "Production backend URL"
}

output "production_frontend_url" {
  value = "https://${azurerm_container_app.frontend.latest_revision_fqdn}"
  description = "Production frontend URL"
}

output "staging_backend_url" {
  value = "https://${azurerm_container_app.backend_staging.latest_revision_fqdn}"
  description = "Staging backend URL"
}

output "staging_frontend_url" {
  value = "https://${azurerm_container_app.frontend_staging.latest_revision_fqdn}"
  description = "Staging frontend URL"
}

output "container_registry_login_server" {
  value = azurerm_container_registry.acr.login_server
  description = "ACR login server URL"
}

output "log_analytics_workspace_id" {
  value = azurerm_log_analytics_workspace.main.id
  description = "Log Analytics workspace ID for monitoring"
}
