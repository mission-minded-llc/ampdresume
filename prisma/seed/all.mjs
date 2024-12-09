import { seedUsers } from "./users.mjs";
import { seedCompanies } from "./company.mjs";
import { seedPositions } from "./position.mjs";
import { seedProjects } from "./project.mjs";
import { seedEducation } from "./education.mjs";

import { seedSkills } from "./skills.mjs";
import { seedSkillsForUser } from "./skillsForUser.mjs";
import { seedSkillsForProject } from "./skillsForProject.mjs";

await seedUsers();
await seedCompanies();
await seedPositions();
await seedProjects();
await seedEducation();

await seedSkills();
await seedSkillsForUser();
await seedSkillsForProject();
