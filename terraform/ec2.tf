# Create a micro free-tier EC2 instance to use as a bastion host for SSM Session Manager. 
resource "aws_instance" "bastion" {
  ami           = "ami-07d9cf938edb0739b" # AWS Linux 2 AMI
  instance_type = "t2.micro"              # Free-tier eligible.

  subnet_id              = aws_subnet.public[0].id
  vpc_security_group_ids = [aws_security_group.bastion-sg.id]
  iam_instance_profile   = aws_iam_instance_profile.ssm_instance_profile.name

  root_block_device {
    volume_size = 8
    volume_type = "gp2"
  }

  tags = {
    Name        = "Shared Bastion"
    Environment = "Shared"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_security_group" "bastion-sg" {
  name        = "bastion-sg"
  description = "Security group for bastion host"
  vpc_id      = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.rds_sg.id]
  }

  tags = {
    Name = "bastion-sg"
  }
}

resource "aws_iam_role" "ssm_role" {
  name = "ssm-bastion-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "ssm_policy_attach" {
  name       = "ssm-policy-attach"
  roles      = [aws_iam_role.ssm_role.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_instance_profile" {
  name = "ssm-bastion-instance-profile"
  role = aws_iam_role.ssm_role.name
}
