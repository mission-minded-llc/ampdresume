import { prisma } from "@/lib/prisma";

export const getSkills = async () => await prisma.skill.findMany({ where: { published: true } });
