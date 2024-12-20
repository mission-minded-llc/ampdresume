provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

provider "aws" {
  alias  = "us_west_2"
  region = "us-west-2"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # Or "~> 4.0" if you prefer the older version
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}
