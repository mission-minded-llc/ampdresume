# OpenResume

OpenResume is an interactive resume platform where job-seekers can manager their own public resume
presence with interactive features to showcase their work.

## The Stack

--

## Local Setup

--

## infrastructure

### Connecting to Remote RDS

To connect to the remote RDS in AWS, you first need to ensure you have the
[Session Manager Plugin](https://docs.aws.amazon.com/systems-manager/latest/userguide/install-plugin-macos-overview.html)
installed.

After your infrastructure is setup via `npm run terraform:apply`, you should have an EC2 instance
available named "Shared Bastion"

Copy the "Shared Bastion" EC2 instance ID to its appropriate place in the `.env` file. Then, to
start the instance (if it's not already started), run `npm run ssm:start`.

Then, to connet and port-forward your RDS database connection, run `npm run ssm:connect:test` for
`test` DB, or `npm run ssm:connect:prod` for prod.
