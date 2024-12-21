resource "aws_secretsmanager_secret" "db_secrets" {
  for_each = var.environments
  name     = "${each.key}/postgresql/credentials"
  tags     = each.value.tags

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_secretsmanager_secret_version" "secret_versions" {
  for_each  = var.environments
  secret_id = aws_secretsmanager_secret.db_secrets[each.key].id
  secret_string = jsonencode({
    username = "dbadmin"
    password = random_password.db_passwords[each.key].result
    engine   = "postgresql"
    host     = aws_db_instance.postgresql[each.key].address
    port     = 5432
    dbname   = each.value.db_name
  })
  depends_on = [aws_db_instance.postgresql]

  lifecycle {
    create_before_destroy = true
  }
}
