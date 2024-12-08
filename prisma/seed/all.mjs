import { seedUsers } from "./users.mjs";
import { seedCompanies } from "./company.mjs";
import { seedEducation } from "./education.mjs";
import { seedSkills } from "./skills.mjs";
import { seedSkillsForUser } from "./skillsForUser.mjs";

await seedUsers();
await seedCompanies();
await seedEducation();

await seedSkills();
await seedSkillsForUser();
