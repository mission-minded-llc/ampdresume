import * as Sentry from "@sentry/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { publicResumeDataCacheTag } from "@/lib/publicResumeDataCacheTag";

/**
 * Invalidates Next.js route and Data Cache for the public resume routes for a user.
 * Call after GraphQL mutations persist resume-related data.
 *
 * Public pages load resume data via Apollo/fetch; on Vercel, `revalidatePath` alone may not
 * purge those entries unless they are tagged — see `publicResumeDataCacheTag` + Apollo link.
 */
export function revalidatePublicResumeBySlug(slug: string | null | undefined): void {
  if (!slug) return;
  try {
    revalidatePath(`/r/${slug}`);
    revalidatePath(`/r/${slug}/pdf`);
    revalidateTag(publicResumeDataCacheTag(slug), { expire: 0 });
  } catch (error) {
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
