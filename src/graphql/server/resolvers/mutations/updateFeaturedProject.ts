import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { sanitizeHtmlServer } from "@/lib/secureHtmlParser";

export const updateFeaturedProject = async (
  _: string,
  {
    id,
    userId,
    name,
    description,
    links,
  }: {
    id: string;
    userId: string;
    name: string;
    description?: string | null;
    links: Array<{ label: string; url: string }>;
  },
) => {
  await verifySessionOwnership(userId);

  const existingFeaturedProject = await prisma.featuredProject.findFirst({
    where: { id },
  });

  if (existingFeaturedProject?.userId !== userId)
    throw new Error("Unauthorized: You do not own this featured project");

  // Sanitize description if provided
  const sanitizedDescription = description ? sanitizeHtmlServer(description) : null;

  const featuredProject = await prisma.featuredProject.update({
    where: { id },
    data: {
      name,
      description: sanitizedDescription,
      links: links as unknown as object,
    },
  });

  return featuredProject;
};
