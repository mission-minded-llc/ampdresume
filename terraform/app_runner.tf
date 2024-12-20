resource "aws_apprunner_service" "service" {
  for_each = var.environments

  service_name = "openresume-${each.key}"

  source_configuration {
    auto_deployments_enabled = true

    image_repository {
      image_configuration {
        port = "3000"
        runtime_environment_variables = {
          NODE_ENV     = each.key
          DB_SECRET_ID = aws_secretsmanager_secret.db_secrets[each.key].arn
        }
      }
      image_identifier      = "public.ecr.aws/docker/library/hello-world:latest"
      image_repository_type = "ECR_PUBLIC"
    }
  }

  instance_configuration {
    cpu               = "1024"
    memory            = "2048"
    instance_role_arn = aws_iam_role.app_runner_instance_role.arn
  }

  network_configuration {
    egress_configuration {
      egress_type       = "VPC"
      vpc_connector_arn = aws_apprunner_vpc_connector.connector.arn
    }
  }

  health_check_configuration {
    path     = "/health"
    protocol = "HTTP"
  }

  tags = each.value.tags
}

# Custom domain configuration
resource "aws_apprunner_custom_domain_association" "domain" {
  for_each = {
    test = "test.openresume.org"
    prod = "www.openresume.org"
  }

  domain_name = each.value
  service_arn = aws_apprunner_service.service[each.key].arn
}
