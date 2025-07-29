#!/bin/bash

echo "Setting up local development environment..."

# We use nvm to manage Node.js versions, so we need to set the correct version
# to ensure consistent behavior across different environments.
echo "Setting Node version to match .nvmrc..."
export NVM_DIR="$HOME/.nvm"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
fi
nvm use

# Now that we have the correct Node version, we can install dependencies.
echo "Installing npm dependencies..."
npm install
 
# Generate Prisma client, which gets used by the application and contains
# all the relevant database schema and type information.
echo "Generating Prisma client..."
npm run prisma:generate
 
# Run migrations, which creates the database tables and sets up the schema.
# Whenever prisma/schema.prisma is updated, you'll need to run this command
# to update the local database.
echo "Running migrations..."
npm run prisma:migrate

# Seed data, which adds some initial data to the database for testing and
# development purposes.
echo "Seeding data..."
npm run prisma:seed

echo "Development environment setup complete!"
echo "To start the development server:"
echo "  npm run dev"
echo ""
