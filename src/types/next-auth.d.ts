import { DefaultSession } from "next-auth";
import type { PdfThemeName, ThemeName } from "@/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Adds the `id` field
      email?: string | null;
      name?: string | null;
      slug?: string | null;
      image?: string | null;
      webThemeName?: ThemeName;
      pdfThemeName?: PdfThemeName;
    } & DefaultSession["user"];
  }
}
