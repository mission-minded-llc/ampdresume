import { NextAuthOptions } from "next-auth";
import EmailProvider, { EmailConfig } from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
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
  await transport.sendMail({
    to: identifier,
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
      // Custom email sending function
      sendVerificationRequest,
    }),
  ],
  // Optional: customize pages
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  // },
};
