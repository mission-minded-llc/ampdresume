/* eslint-disable no-console */

// Use Prisma to seed data from ./skills.csv into the Skills table.

import { fileURLToPath } from "url";
import fs from "fs";
import { logTitle } from "./helpers/util";
import path from "path";
import { prisma } from "@/lib/prisma";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedSkills() {
  logTitle("Seeding Predefined Skills");

  let skillsUnchangedCount = 0;
  const skillsUpdated = [];
  const skillsCreated = [];

  const skills = fs
    .readFileSync(path.join(__dirname, "skills.csv"), "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const data = line.split(",");
      return {
        name: data[0].replaceAll("&comma;", ","),
        icon: data[1],
      };
    });

  for (const skill of skills) {
    const existingSkill = await prisma.skill.findFirst({
      where: {
        name: skill.name,
      },
    });

    if (existingSkill) {
      if (existingSkill.name === skill.name && existingSkill.icon === skill.icon) {
        skillsUnchangedCount += 1;
      } else {
        const updatedSkill = await prisma.skill.update({
          where: {
            id: existingSkill.id,
          },
          data: skill,
        });
        console.log(`Updated skill ${updatedSkill.name} with id: ${updatedSkill.id}`);
        skillsUpdated.push(updatedSkill.name);
      }

      continue;
    }

    await prisma.skill.create({
      data: skill,
    });
    skillsCreated.push(skill.name);
  }

  console.log(`Skills unchanged: ${skillsUnchangedCount}`);

  console.log(`Skills updated: ${skillsUpdated.length}`);
  if (skillsUpdated.length > 0) console.log(`Skills updated: ${skillsUpdated.join(", ")}`);

  console.log(`Skills created: ${skillsCreated.length}`);
  if (skillsCreated.length > 0) console.log(`Skills created: ${skillsCreated.join(", ")}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedSkills()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
