import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export const addProject = async (
  _: string,
  { userId, positionId, name }: { userId: string; positionId: string; name: string },
) => {
  await verifySessionOwnership(userId);

  const existingPosition = await prisma.position.findFirst({
    where: { id: positionId },
  });

  if (!existingPosition) throw new Error("Position not found");

  const existingCompany = await prisma.company.findFirst({
    where: { id: existingPosition.companyId },
  });

  if (existingCompany?.userId !== userId)
    throw new Error("Unauthorized: You do not own this position or company");

  // Get all projects within the position, and set the new sortIndex value to the
  // next-highest value (or 0 if there are no projects).
  const projects = await prisma.project.findMany({
    where: { positionId },
    orderBy: { sortIndex: "desc" },
  });
  const sortIndex = projects.length > 0 ? projects[0].sortIndex + 1 : 0;

  const project = await prisma.project.create({
    data: {
      positionId,
      name,
      sortIndex,
    },
  });

  return project;
};
