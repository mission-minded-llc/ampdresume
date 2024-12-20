data "aws_iam_policy_document" "app_runner_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["build.apprunner.amazonaws.com", "tasks.apprunner.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "app_runner_service_role" {
  name               = "app-runner-service-role"
  assume_role_policy = data.aws_iam_policy_document.app_runner_assume_role.json
}

resource "aws_iam_role_policy_attachment" "app_runner_service_policy" {
  role       = aws_iam_role.app_runner_service_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}
