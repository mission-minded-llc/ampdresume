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
}

resource "aws_security_group" "vpce" {
  name        = "vpce-security-group"
  description = "Security group for VPC Endpoints"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }
}

resource "aws_security_group" "app_runner" {
  name        = "app-runner-security-group"
  description = "Security group for App Runner VPC Connector"
  vpc_id      = aws_vpc.main.id

  # Allow outbound traffic to RDS
  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # Replace with appropriate CIDR block
  }

  # Allow all other outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "app-runner-sg"
  }
}
