import { NextAuthOptions } from "next-auth";
import EmailProvider, { EmailConfig } from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { findUserByNormalizedEmail } from "@/util/email";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

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

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
    // Not sure if I need these.
    //
    // async session({ session, token, user }) {
    //   // Ensure the session includes the correct email
    //   if (token.email) {
    //     session.user.email = token.email;
    //   }

    //   console.log({ token, session });

    //   return session;
    // },
    // async jwt({ token, user }) {
    //   // Add the correct email to the token if available
    //   if (user?.email) {
    //     token.email = user.email;
    //   }

    //   console.log({ token, user });

    //   return token;
    // },
  },

  // Customized pages.
  pages: {
    signIn: "/login",
    signOut: "/logout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
  },
};
