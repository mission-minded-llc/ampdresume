import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Adds the `id` field
      email?: string | null;
      name?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}
