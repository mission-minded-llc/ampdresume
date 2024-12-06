// Use Prisma to seed data from ./skills.csv into the Skills table.

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const skills = fs
    .readFileSync(path.join(__dirname, "skills.csv"), "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [name] = line.split(",");
      return { name };
    });

  for (const skill of skills) {
    await prisma.skill.create({
      data: skill,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
