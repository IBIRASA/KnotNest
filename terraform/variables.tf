variable "location" {
  default = "East US"
}
variable "resource_group_name" {
  type    = string
  default = "knotnest-rg"
}

variable "container_image_backend" {
  type    = string
  default = "knotcontaineracr123.azurecr.io/knotnest_backend:latest"
}

variable "container_image_frontend" {
  type    = string
  default = "knotcontaineracr123.azurecr.io/knotnest_frontend:latest"
}
