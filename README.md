# Amp'd Resume

Amp'd Resume is an interactive resume platform where job-seekers can manager their own public resume
presence with interactive features to showcase their skills, work history, and education.

## The Stack

This product is a Next.js full stack web application, currently hosted on Vercel.

- Application: Next.js with TypeScript
- Authentication: NextAuth (Auth.js), OAuth, Email magic links
- Database: PostgreSQL
- Data Fetching: Tanstack Query, Apollo, GraphQL
- Testing: Jest, Cypress
- Primary Hosting: Vercel
- Media Hosting: AWS S3

## Local Setup

Running the app locally requires a few steps and local environment variable values.

### Environment Variables

To start, copy `.env.example` to `.env` and update the "Required" variable values. These are
documented in the file comments.

### Development Environment

This project uses Docker Compose for local development. The development environment expects Node.js
(see `.nvmrc` for version), and includes containers for:

- PostgreSQL 16

#### Starting the Development Environment

1. **Setup Dependencies**

   ```bash
   sh ./scripts/setup-dev.sh
   ```

2. **Start the containers:**

   ```bash
   docker-compose up -d
   ```

3. **Setup Database**

   First time only, or when resetting your local database.

   ```bash
   sh ./scrips/localSetup.sh
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The app will be available at http://localhost:3000/

#### VS Code Integration

This project includes recommended VS Code extensions and settings. When you open the project in VS
Code, you'll be prompted to install the recommended extensions for the best development experience.

#### Database Access

The PostgreSQL database is accessible on port 5432 with the following credentials:

- Username: `postgres`
- Password: `postgres`
- Database: `ampdresume`

## Infrastructure

Amp'd Resume is currently hosted on Vercel. The database is hosted by DigitalOcean. Media assets are
hosted on AWS S3.

For local development, no changes are needed for the database references. However, if you want to
test file upload ability, you'll need to set up an S3 bucket and provide the values for S3 settings
in your local `.env`:

```
# AWS S3 bucket for storing user uploaded files.
AWS_S3_BUCKET_NAME=[your publicly-accessible bucket name]
AWS_S3_USER_ACCESS_KEY_ID=[use your key id]
AWS_S3_USER_SECRET_ACCESS_KEY=[use your secret access key]
```

## 📄 License

This project is licensed under the **Amp’d Community License 1.0**.

- ✅ You can view, fork, and modify the source code for non-commercial, personal, and educational
  use.
- ❌ You **may not** use this project or its derivatives in a commercial product or service.
- ❌ You **may not** host it in a production environment or monetize it in any way.

To inquire about commercial use or extended rights, please contact: contact@missionminded.net

See the full license in [LICENSE](./LICENSE).
