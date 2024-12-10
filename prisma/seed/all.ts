import { seedUsers } from "./users";
import { seedCompanies } from "./company";
import { seedPositions } from "./position";
import { seedProjects } from "./project";
import { seedEducation } from "./education";

import { seedSkills } from "./skills";
import { seedSkillsForUser } from "./skillsForUser";
import { seedSkillsForProject } from "./skillsForProject";

await seedUsers();
await seedCompanies();
await seedPositions();
await seedProjects();
await seedEducation();

await seedSkills();
await seedSkillsForUser();
await seedSkillsForProject();
