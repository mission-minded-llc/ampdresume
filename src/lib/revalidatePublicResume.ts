import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

/**
 * Invalidates Next.js RSC cache for the public resume routes for a user.
 * Call after GraphQL mutations persist resume-related data.
 */
export function revalidatePublicResumeBySlug(slug: string | null | undefined): void {
  if (!slug) return;
  revalidatePath(`/r/${slug}`);
  revalidatePath(`/r/${slug}/pdf`);
}

export async function revalidatePublicResumeForUserId(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { slug: true },
  });
  revalidatePublicResumeBySlug(user?.slug);
}
