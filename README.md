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

### Dev Container

Next, within VS Code or Cursor, enter the command palette (`Cmd+Shift+P` on Mac, or `Ctrl+Shift+P`
on Windows), then select "Rebuild and Reopen in Container"

To learn more about dev containers, read up here:
https://code.visualstudio.com/docs/devcontainers/containers

### Running the Dev Server

After the containers have started and you're working inside the Dev Container, you should be able to
access the database locally on port 5432 using the username/password saved in
`.devcontainer/docker-compose.yml`.

You can run the local dev server via `npm run dev`. You should be able to access the app at
http://localhost:3000/

## Infrastructure

Amp'd Resume is currently hosted on Vercel. The database is hosted by DigitalOcean. Media assets are
hosted on AWS S3.

## 📄 License

This project is licensed under the **Amp’d Community License 1.0**.

- ✅ You can view, fork, and modify the source code for non-commercial, personal, and educational
  use.
- ❌ You **may not** use this project or its derivatives in a commercial product or service.
- ❌ You **may not** host it in a production environment or monetize it in any way.

To inquire about commercial use or extended rights, please contact: contact@missionminded.net

See the full license in [LICENSE](./LICENSE).
