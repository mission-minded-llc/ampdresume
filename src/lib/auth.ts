import { getServerSession, NextAuthOptions } from "next-auth";
import EmailProvider, { EmailConfig } from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { findUserByNormalizedEmail } from "@/util/email";
import nodemailer from "nodemailer";

// Initialize Prisma client here.
const prisma = new PrismaClient();

/**
 * The custom email sending function for the email provider.
 * This email template can be styled to match the app.
 *
 * @param {string} props.identifier The email address to send the verification request to.
 * @param {string} props.url The URL to include in the email.
 * @param {EmailConfig} props.provider The email provider configuration.
 */
export const sendVerificationRequest = async ({
  identifier,
  url,
  provider,
}: {
  identifier: string;
  url: string;
  provider: EmailConfig;
}) => {
  const { server, from } = provider;
  const { host } = new URL(url);

  const transport = nodemailer.createTransport(server);

  // Normalize the email before sending
  const normalizedEmail = await findUserByNormalizedEmail(identifier);

  // Use the matched email if found, otherwise fallback to the original
  const emailToSend = normalizedEmail?.email ? normalizedEmail.email : identifier;

  await transport.sendMail({
    to: emailToSend,
    from,
    subject: `Sign in to ${host}`,
    text: `Sign in to ${host}\n${url}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <h1>Sign in to ${host}</h1>
        <p>Click the link below to sign in:</p>
        <a href="${url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Sign in</a>
        <p>Or copy and paste this URL into your browser:</p>
        <code>${url}</code>
      </div>
    `,
  });
};

/**
 * Configuration options for NextAuth.
 * The options are passed to the NextAuth middleware,
 * and exported here for use in tests as well.
 */
export const authOptions: NextAuthOptions = {
  // Database adapter for Prisma, abstracts the database operations.
  adapter: PrismaAdapter(prisma),

  // Providers to use for authentication.
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env?.EMAIL_SERVER_PORT || "587", 10),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest, // Custom email sending function
    }),
  ],

  // Secret and session configuration.
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, // Ensure cookie is only accessible via HTTP requests
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "lax", // or "strict" if needed
        path: "/", // Path where the cookie is available, "/" makes it available site-wide
        domain: process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : undefined, // Set domain to match your site
      },
    },
  },

  // Customized callbacks.
  callbacks: {
    async signIn(data) {
      const { user, account } = data;

      if (account?.provider === "email" && user?.email) {
        const existingUser = await findUserByNormalizedEmail(user?.email);

        // If a match is found, use the database email
        if (existingUser?.email) {
          user.id = existingUser.email;
          user.email = existingUser.email;
          account.providerAccountId = existingUser.email;
          account.userId = existingUser.email;
        }
      }

      return true; // Proceed with the default sign-in flow.
    },
  },

  // Customized pages.
  pages: {
    signIn: "/login",
    signOut: "/logout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
  },
};

/**
 * Helper function to get the current session. Reduces
 * the need to import the `getServerSession` function
 * in every file that needs it.
 *
 * @returns {Promise<Session | null>} The current session or null.
 */
export const getSession = async () => await getServerSession(authOptions);
