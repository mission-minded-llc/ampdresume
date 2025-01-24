import { getCompanies } from "./queries/getCompanies";
import { getEducation } from "./queries/getEducation";
import { getPositions } from "./queries/getPositions";
import { getSkills } from "./queries/getSkills";
import { getSkillsForProject } from "./queries/getSkillsForProject";
import { getSkillsForUser } from "./queries/getSkillsForUser";
import { getSocials } from "./queries/getSocials";
import { getUser } from "./queries/getUser";

export const queryResolvers = {
  // General queries.
  skills: getSkills,

  // User-specific queries.
  user: getUser,
  socials: getSocials,
  skillsForUser: getSkillsForUser,
  companies: getCompanies,
  positions: getPositions,
  education: getEducation,
  skillsForProject: getSkillsForProject,
};
