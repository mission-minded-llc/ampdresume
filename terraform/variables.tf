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
