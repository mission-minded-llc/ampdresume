resource "aws_db_subnet_group" "postgresql" {
  name       = "postgresql-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_db_instance" "postgresql" {
  for_each          = var.environments
  identifier        = "postgresql-${each.key}"
  engine            = "postgres"
  engine_version    = "14"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_type      = "gp2"

  db_name  = each.value.db_name
  username = "dbadmin"
  password = random_password.db_passwords[each.key].result

  skip_final_snapshot = true

  vpc_security_group_ids = [var.rds_security_group_id]
  db_subnet_group_name   = aws_db_subnet_group.postgresql.name

  publicly_accessible = false
  multi_az            = false

  tags = each.value.tags

  lifecycle {
    prevent_destroy = true
  }
}
