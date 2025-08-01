# Security Policy

## Supported Versions

We are committed to maintaining security for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these
steps:

### 1. **DO NOT** create a public GitHub issue

Security vulnerabilities should be reported privately to prevent potential exploitation.

### 2. **Email us directly**

Send your report to: **security@missionminded.net**

### 3. **Include the following information**

- **Description**: Clear description of the vulnerability
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Impact**: Potential impact of the vulnerability
- **Suggested fix**: If you have ideas for fixing the issue
- **Affected versions**: Which versions are affected
- **Proof of concept**: If applicable, include a proof of concept

### 4. **What to expect**

- **Response time**: We aim to respond within 48 hours
- **Acknowledgment**: You'll receive an acknowledgment of your report
- **Updates**: We'll keep you updated on our progress
- **Credit**: If you wish, we'll credit you in our security advisories

## Security Best Practices

### For Contributors

1. **Input Validation**: Always validate and sanitize user input
2. **Authentication**: Use the existing session verification patterns
3. **Database Access**: Use Prisma ORM for all database operations
4. **Environment Variables**: Never commit sensitive data to the repository
5. **Dependencies**: Keep dependencies updated and report security issues

### For Users

1. **Environment Setup**: Use the provided `.env.example` template
2. **Secrets Management**: Store sensitive data in environment variables
3. **Database Security**: Use strong passwords and restrict access
4. **File Uploads**: Validate file types and sizes
5. **HTTPS**: Always use HTTPS in production

## Security Features

### Authentication & Authorization

- NextAuth.js with multiple OAuth providers
- Session-based authentication with secure cookies
- User ownership verification for all data operations
- Email magic link authentication

### Data Protection

- Prisma ORM with parameterized queries
- GraphQL type safety and input validation
- User data filtering based on authentication status
- Secure file upload validation

### Infrastructure Security

- HTTPS enforcement in production
- Security headers (X-Frame-Options, CSP)
- CORS configuration
- AWS S3 with proper IAM policies

## Known Security Considerations

### Current Limitations

- `displayEmail` addresses are displayed publicly
- File uploads are limited to images but not virus-scanned
- Rate limiting is not implemented on all endpoints

### Planned Improvements

- [ ] Implement rate limiting on API endpoints
- [ ] Consider virus scanning for file uploads
- [ ] Enhanced Content Security Policy headers

## Responsible Disclosure

We follow responsible disclosure practices:

1. **Private reporting** of vulnerabilities
2. **Timely response** to security reports
3. **Coordinated disclosure** with affected parties
4. **Public acknowledgment** of security researchers
5. **Transparent communication** about security issues

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and will be clearly marked
in the changelog.

## Contact Information

- **Security Email**: security@missionminded.net
- **Project Maintainer**: Michael Dinerstein
- **Organization**: Mission Minded LLC

## License

This security policy is part of the Amp'd Community License 1.0. For commercial use or extended
security support, please contact: contact@missionminded.net

---

**Thank you for helping keep Amp'd Resume secure!**
