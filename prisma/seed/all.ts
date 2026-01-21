import { seedCertifications } from "./certification";
import { seedCompanies } from "./company";
import { seedEducation } from "./education";
import { seedFeaturedProjects } from "./featuredProject";
import { seedPositions } from "./position";
import { seedProjects } from "./project";
import { seedSkills } from "./skills";
import { seedSkillsForProject } from "./skillsForProject";
import { seedSkillsForUser } from "./skillsForUser";
import { seedSocials } from "./social";
import { seedUsers } from "./users";

/**
 * Seed the database with sample data,
 * sequentially.
 */
async function seed() {
  await seedUsers();
  await seedSocials();
  await seedCompanies();
  await seedPositions();
  await seedProjects();
  await seedEducation();
  await seedCertifications();
  await seedFeaturedProjects();
  await seedSkills();
  await seedSkillsForUser();
  await seedSkillsForProject();
}

seed();
