# Contributing to Amp'd Resume

Thank you for your interest in contributing to Amp'd Resume! This document provides guidelines and
information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [License](#license)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful
and inclusive in all interactions.

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` for version)
- Docker and Docker Compose
- Git

### Quick Start

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/mission-minded-llc/ampdresume.git
   cd ampdresume
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the development environment**

   ```bash
   docker-compose up -d
   npm run init
   npm run dev
   ```

4. **Access the application**
   - Web app: http://localhost:3000
   - Database: localhost:5432 (postgres/postgres)

## Development Setup

### Environment Variables

Copy `.env.example` to `.env` and configure the following:

**Required for basic functionality:**

- `DATABASE_URL` - PostgreSQL connection string, set by default.
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_URL` - Your local development URL, set by default.

**Optional for full features:**

- OAuth provider credentials (Google, LinkedIn)
- Email server configuration
- AWS S3 credentials for file uploads and Terraform setup.
- OpenAI API key for AI features

### Database Setup

The project uses PostgreSQL with Prisma ORM:

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database
npm run prisma:seed
```

### Local Authentication

For local development without OAuth providers:

1. Use the email `test@ampdresume.com` in the sign-in form
2. Check `./.cypress-temp/magic-link-test_ampdresume_com.txt` for the magic link
3. Open the link to sign in as the test user

## Coding Standards

### TypeScript

- Use TypeScript for all new code.
- Keep strict mode enabled in `tsconfig.json`.
- Use proper type annotations.
- Avoid `any` types.
- Use type inference when possible.

### Code Style

- Use Prettier for code formatting.
- Follow ESLint rules.
- Use meaningful variable and function names.
- Add JSDoc comments for complex functions.

### File Organization

```
src/
├── app/                # Next.js App Router pages
├── components/         # Reusable UI components
├── graphql/            # GraphQL schema and resolvers
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
└── util/               # Helper functions
```

### Component Guidelines

- Use functional components with hooks.
- Follow the existing naming conventions.
- Include proper TypeScript interfaces.
- Add tests for new components.

### GraphQL Guidelines

- Use Prisma for all database operations.
- Implement proper session ownership verification.
- Follow the existing resolver patterns.
- Add input validation where needed.

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Update snapshots
npm run test:update
```

### Test Guidelines

- Write tests for new features.
- Use descriptive test names.
- Follow the existing test patterns.
- Mock external dependencies.
- Test both success and error cases.

### Cypress E2E Tests

```bash
# Run Cypress tests
npm run cypress:test

# Clean up test data
npm run cypress:cleanup
```

## Pull Request Process

### Before Submitting

1. **Sign the Contributor License Agreement (CLA)**
   - Before opening a pull request, you must sign our Contributor License Agreement.
   - Visit [CLA Assistant](https://cla-assistant.io/) to sign the CLA.
   - The CLA will be automatically checked when you create a pull request.
   - Your PR cannot be merged until the CLA is signed.

2. **Ensure tests pass**

   ```bash
   npm run check  # Runs lint, type check, and tests.
   ```

3. **Update documentation**
   - Update README.md if needed.
   - Add JSDoc comments for new functions.
   - Update API documentation if applicable.

4. **Check for security issues**
   - Validate all user inputs.
   - Use existing authentication patterns.
   - Follow security best practices.

### Pull Request Guidelines

1. **Create a descriptive title**
   - Use [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format:
     `type: description`.
   - Examples: `feat: add user profile editing`, `fix: resolve authentication issue`.

2. **Write a detailed description**
   - Explain what the PR does.
   - Include screenshots for UI changes.
   - Reference related issues.

3. **Keep PRs focused**
   - One feature or fix per PR.
   - Keep changes small and reviewable.
   - Break large changes into multiple PRs.

4. **Request reviews**
   - Tag relevant team members.
   - Respond to review comments promptly.
   - Make requested changes in new commits.

### Commit Message Format

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue.
- **Steps to reproduce**: Detailed steps to reproduce.
- **Expected behavior**: What you expected to happen.
- **Actual behavior**: What actually happened.
- **Environment**: OS, browser, Node.js version.
- **Screenshots**: If applicable.

### Security Issues

For security vulnerabilities, please:

- **DO NOT** create a public issue.
- Email security@missionminded.net.
- Include detailed information about the vulnerability.
- Allow time for investigation and fix.

## Feature Requests

When requesting features:

- **Describe the use case**: Why is this feature needed?
- **Propose a solution**: How should it work?
- **Consider alternatives**: Are there existing solutions?
- **Check existing issues**: Has this been requested before?

## Development Workflow

### Branch Strategy

- `main` - Production-ready code, only merged through Pull Request with passing Continuous
  Integration pipeline.
- `develop` - Integration branch for features, only merged through Pull Request from forks, or
  optional direct via local.
- `feature/*` - Feature branches.
- `fix/*` - Bug fix branches.
- `hotfix/*` - Critical production fixes.

### Release Process

1. Features are developed in feature branches.
2. Feature branches are merged into `develop`.
3. `develop` is merged into `main` for releases.
4. Hotfixes can be merged directly to `main`.

## Getting Help

- **Documentation**: Check the README.md and inline comments.
- **Issues**: Search existing issues for similar problems.
- **Discussions**: Use GitHub Discussions for questions.
- **Email**: Contact contact@missionminded.net for support.

## License

By contributing to Amp'd Resume, you agree that your contributions will be licensed under the Amp'd
Community License 1.0.

For commercial use or extended rights, please contact: contact@missionminded.net

## Recognition

Contributors will be recognized in:

- Project README.md
- Release notes

---

**Thank you for contributing to Amp'd Resume!** 🚀
