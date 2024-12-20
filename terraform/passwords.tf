resource "random_password" "db_passwords" {
  for_each         = var.environments
  length           = 16
  special          = true
  override_special = "!#$%^&*()-_=+[]{}<>:?"
}
