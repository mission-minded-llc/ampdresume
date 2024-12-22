# Accepts arguments: -init, -connect, -stop
# -init:    Start the EC2 instance.
# -connect: Connect to the EC2 instance and port-forward the RDS.
# -stop:    Stop the EC2 instance.

# Import everything from ../.env into environment.
source ../.env

# If the first argument is -init, start the EC2 instance.
if [ "$1" == "-init" ]; then
  # Start the EC2 instance.
  aws ec2 start-instances --instance-ids $BASTION_EC2_INSTANCE_ID
fi

# If the first argument is -connect, connect to the EC2 instance and port-forward the RDS.
aws ssm start-session \
  --target $BASTION_EC2_INSTANCE_ID \
  --document-name AWS-StartPortForwardingSessionToRemoteHost \
  --parameters host="$RDS_TEST_INSTANCE_HOST",portNumber="5432",localPortNumber="5433"

# If the first argument is -stop, stop the EC2 instance.
if [ "$1" == "-stop" ]; then
  # Stop the EC2 instance.
  aws ec2 stop-instances --instance-ids $BASTION_EC2_INSTANCE_ID
fi
