#!/bin/bash
source .env

if [ "$1" == "-start:test" ]; then
  aws rds start-db-instance --db-instance-identifier $RDS_TEST_INSTANCE_ID
fi

if [ "$1" == "-stop:test" ]; then
  aws rds stop-db-instance --db-instance-identifier $RDS_TEST_INSTANCE_ID
fi

if [ "$1" == "-start:prod" ]; then
  aws rds start-db-instance --db-instance-identifier $RDS_PROD_INSTANCE_ID
fi

if [ "$1" == "-stop:prod" ]; then
  aws rds stop-db-instance --db-instance-identifier $RDS_PROD_INSTANCE_ID
fi
