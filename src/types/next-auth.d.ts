import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Adds the `id` field
      email?: string | null;
      name?: string | null;
      slug?: string | null;
      image?: string | null;
      webThemeName?: ThemeName;
      pdfThemeName?: ThemeName;
    } & DefaultSession["user"];
  }
}
