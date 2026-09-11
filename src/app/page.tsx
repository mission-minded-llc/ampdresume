import { Metadata } from "next";
import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { HomePageView } from "@/app/components/HomePageView";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const title = "Amp'd Resume | Build Your Free Interactive Resume";
const description =
  "Amp'd Resume is a free interactive resume builder. Sign in and start building your resume today!";

export const metadata: Metadata = {
  title,
  description,
  authors: [
    {
      name: "Michael R. Dinerstein",
    },
  ],
  openGraph: {
    title,
    description,
    images: [
      {
        url: "/images/og-image.png",
        width: 902,
        height: 556,
      },
    ],
  },
};

export default async function HomePage() {
  let session;
  let user = null;

  try {
    session = await getSession();
    const userId = session?.user?.id;

    if (userId && session) {
      try {
        user = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
        });
      } catch (dbError) {
        // Log database errors but don't fail the page
        Sentry.captureException(dbError);
        // If we have a userId but can't fetch the user, redirect to logout
        // Note: redirect() throws a special error that Next.js handles
        redirect("/logout");
      }

      if (userId && !user) {
        // Note: redirect() throws a special error that Next.js handles
        redirect("/logout");
      }
    }
  } catch (error) {
    // Check if this is a Next.js redirect error - if so, rethrow it
    // Next.js redirect() throws a NEXT_REDIRECT error that should propagate
    if (error && typeof error === "object" && "digest" in error) {
      const digest = (error as { digest?: string }).digest;
      if (digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }
    }
    // Log other session/auth errors but don't fail the page
    Sentry.captureException(error);
    // Continue rendering the page without user data
  }

  return <HomePageView userName={user?.name ?? null} />;
}
