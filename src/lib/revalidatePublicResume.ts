import * as Sentry from "@sentry/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { publicResumeDataCacheTag } from "@/lib/publicResumeDataCacheTag";

/**
 * Invalidates Next.js route and Data Cache for the public resume routes for a user.
 * Call after GraphQL mutations persist resume-related data.
 *
 * Public pages load resume data via Apollo/fetch, and `revalidatePath` alone may not purge those
 * entries unless they are tagged — see `publicResumeDataCacheTag` + Apollo link.
 */
export function revalidatePublicResumeBySlug(slug: string | null | undefined): void {
  if (!slug) return;

  const paths = [`/r/${slug}`, `/r/${slug}/pdf`] as const;
  const tag = publicResumeDataCacheTag(slug);

  try {
    revalidatePath(paths[0]);
    revalidatePath(paths[1]);
    revalidateTag(tag, { expire: 0 });
  } catch (error) {
    // eslint-disable-next-line no-console -- surfaced in Cloud Run logs
    console.error("[revalidatePublicResume]", { result: "error", paths, tag, error });
    Sentry.captureException(error);
  }
}

export async function revalidatePublicResumeForUserId(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { slug: true },
  });
  revalidatePublicResumeBySlug(user?.slug);
}
