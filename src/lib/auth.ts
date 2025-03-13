import * as Sentry from "@sentry/nextjs";

import EmailProvider, { EmailConfig } from "next-auth/providers/email";
import { NextAuthOptions, Session as NextAuthSession, getServerSession } from "next-auth";

import { ALLOWED_USER_EMAILS } from "@/constants";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { findUserByNormalizedEmail } from "@/util/email";
import fs from "fs";
import { getEnvironmentName } from "@/util/url";
import nodemailer from "nodemailer";
import path from "path";
import { prisma } from "@/lib/prisma";

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

  if (getEnvironmentName() !== "production" && !ALLOWED_USER_EMAILS.includes(emailToSend)) {
    Sentry.captureMessage(`Email ${emailToSend} is not allowed to sign in.`);

    throw new Error("Email is not allowed to sign in.");
  }

  // Save the magic link to a temp file for Cypress to use.
  if (process.env.NODE_ENV === "test" || process.env.CYPRESS_TEST === "true") {
    const tempDir = path.join(process.cwd(), ".cypress-temp");

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    // Save magic link to file named after the email address
    const safeEmail = emailToSend.replace(/[@.]/g, "_");
    const filePath = path.join(tempDir, `magic-link-${safeEmail}.txt`);

    fs.writeFileSync(filePath, url);
  }

  await transport.sendMail({
    to: emailToSend,
    from,
    subject: `Sign in to OpenResume (${host})`,
    text: `Click to sign in to OpenResume:\n\n${url}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <h1>Sign in to OpenResume (${host})</h1>
        <p>Click the link below to sign in:</p>
        <a href="${url}" style="background-color: purple; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 10px;">Sign In</a>
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
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
      const { user, account, profile } = data;

      if (account?.provider === "google" && profile?.email) {
        if (getEnvironmentName() !== "production" && !ALLOWED_USER_EMAILS.includes(profile.email)) {
          Sentry.captureMessage(`Email ${profile.email} is not allowed to sign in with Google.`);

          return false; // Prevent sign-in
        }

        const existingUser = await findUserByNormalizedEmail(profile.email);

        // If a match is found, use the database email
        if (existingUser?.email) {
          user.id = existingUser.email;
          user.email = existingUser.email;
          account.providerAccountId = existingUser.email;
          account.userId = existingUser.email;
        }

        return true; // Proceed with the default sign-in flow.
      }

      if (account?.provider === "email" && user?.email) {
        const existingUser = await findUserByNormalizedEmail(user?.email);

        // If a match is found, use the database email
        if (existingUser?.email) {
          user.id = existingUser.email;
          user.email = existingUser.email;
          account.providerAccountId = existingUser.email;
          account.userId = existingUser.email;
        }

        return true; // Proceed with the default sign-in flow.
      }

      return true; // Proceed with the default sign-in flow.
    },

    async session({
      session,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      token,
      user,
    }: {
      session: NextAuthSession & { user: { id: string } };
      token: JWT;
      user: AdapterUser & { slug?: string };
    }) {
      // Add the user ID to the session for easier database operations.
      session.user = { ...session.user, id: user.id, email: user.email };

      // Add the user slug to the session if it exists.
      if (user.slug) {
        session.user.slug = user.slug;
      }

      return session;
    },
  },

  // Customized pages.
  pages: {
    signIn: "/login",
    signOut: "/logout",
    // error: "/auth/error",
    verifyRequest: "/login/verify",
  },
};

/**
 * Helper function to get the current session server-side.
 * Reduces the need to import the `getServerSession` function
 * in every file that needs it.
 *
 * @returns {Promise<Session | null>} The current session or null.
 */
export const getSession = async () => await getServerSession(authOptions);
