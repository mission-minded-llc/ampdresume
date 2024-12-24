variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environments" {
  description = "Environment configurations"
  type = map(object({
    db_name = string
    tags    = map(string)
  }))
  default = {
    test = {
      db_name = "testdb"
      tags    = { Environment = "Test" }
    }
    prod = {
      db_name = "proddb"
      tags    = { Environment = "Production" }
    }
  }
}

variable "rds_security_group_id" {
  description = "The security group ID for the RDS instance"
  type        = string
}

variable "allowed_ssh_ips" {
  description = "List of allowed IP addresses for SSH to EC2 instances"
  type        = list(string)
}

variable "ssh_public_key" {
  description = "Public key for SSH access"
  type        = string
}
