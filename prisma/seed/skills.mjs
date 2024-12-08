/* eslint-disable no-console */

// Use Prisma to seed data from ./skills.csv into the Skills table.

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

export async function seedSkills() {
  const skills = fs
    .readFileSync(path.join(__dirname, "skills.csv"), "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const data = line.split(",");
      return {
        name: data[1],
        icon: data[2],
      };
    });

  for (const skill of skills) {
    const existingSkill = await prisma.skill.findFirst({
      where: {
        name: skill.name,
      },
    });

    if (existingSkill) {
      console.log(`Skill already exists: ${skill.name}`);
      continue;
    }

    const createdSkill = await prisma.skill.create({
      data: skill,
    });
    console.log(`Created skill ${skill.name} with id: ${createdSkill.id}`);
  }
}

seedSkills()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
