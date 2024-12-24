#!/bin/bash
source .env

if [ "$1" == "-start" ]; then
  aws ec2 start-instances --instance-ids $BASTION_EC2_INSTANCE_ID
fi

if [ "$1" == "-connect:test" ]; then
  aws ssm start-session \
    --target $BASTION_EC2_INSTANCE_ID \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters host="$RDS_TEST_INSTANCE_HOST",portNumber="5432",localPortNumber="5433"
fi

if [ "$1" == "-connect:prod" ]; then
  aws ssm start-session \
    --target $BASTION_EC2_INSTANCE_ID \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters host="$RDS_PROD_INSTANCE_HOST",portNumber="5432",localPortNumber="5433"
fi

if [ "$1" == "-stop" ]; then
  aws ec2 stop-instances --instance-ids $BASTION_EC2_INSTANCE_ID
fi
