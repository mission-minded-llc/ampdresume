#!/bin/bash

# Development setup script
# This replaces the postCreateCommand from the devcontainer

echo "Setting up development environment..."

echo "Setting Node version to match .nvmrc..."
export NVM_DIR="$HOME/.nvm"
# Load nvm if it's not already loaded
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
fi
nvm use

# Install dependencies
echo "Installing npm dependencies..."
npm install

# Generate Prisma client
echo "Generating Prisma client..."
npm run prisma:generate

# Run migrations
echo "Running migrations..."
npm run prisma:migrate

# Seed data
echo "Seeding data..."
npm run prisma:seed

echo "Development environment setup complete!"
echo ""
echo "To start the development environment:"
echo "  docker-compose up -d"
echo ""
echo "To start the development server:"
echo "  npm run dev"
 