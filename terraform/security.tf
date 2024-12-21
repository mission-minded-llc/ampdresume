resource "aws_security_group" "rds_sg" {
  name        = "rds-security-group"
  description = "Security group for RDS instances"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # Replace with appropriate CIDR block
  }

  lifecycle {
    prevent_destroy = true
  }
}
