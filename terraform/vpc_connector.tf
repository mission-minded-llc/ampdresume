resource "aws_apprunner_vpc_connector" "connector" {
  vpc_connector_name = "app-runner-connector"
  subnets            = aws_subnet.private[*].id
  security_groups    = [aws_security_group.app_runner.id]
}
