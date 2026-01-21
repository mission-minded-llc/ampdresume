import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { sanitizeHtmlServer } from "@/lib/secureHtmlParser";

export const addFeaturedProject = async (
  _: string,
  {
    userId,
    name,
    description,
    links,
  }: {
    userId: string;
    name: string;
    description?: string | null;
    links: Array<{ label: string; url: string }>;
  },
) => {
  await verifySessionOwnership(userId);

  // Sanitize description if provided
  const sanitizedDescription = description ? sanitizeHtmlServer(description) : null;

  const featuredProject = await prisma.featuredProject.create({
    data: {
      userId,
      name,
      description: sanitizedDescription,
      links: links as unknown as object,
    },
  });

  return featuredProject;
};
