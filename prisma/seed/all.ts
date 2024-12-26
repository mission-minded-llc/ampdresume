import { seedCompanies } from "./company";
import { seedEducation } from "./education";
import { seedPositions } from "./position";
import { seedProjects } from "./project";
import { seedSkills } from "./skills";
import { seedSkillsForProject } from "./skillsForProject";
import { seedSkillsForUser } from "./skillsForUser";
import { seedUsers } from "./users";

async function seed() {
  await seedUsers();
  await seedCompanies();
  await seedPositions();
  await seedProjects();
  await seedEducation();
  await seedSkills();
  await seedSkillsForUser();
  await seedSkillsForProject();
}

seed();
