#!/bin/sh

# Run the Prisma seed script
echo "Running database seed..."
npm run prisma:seed

# Start the application
echo "Starting the application..."
node server.js
