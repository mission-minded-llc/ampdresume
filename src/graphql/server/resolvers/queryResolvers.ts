import { getCompanies } from "./queries/getCompanies";
import { getEducation } from "./queries/getEducation";
import { getResume } from "./queries/getResume";
import { getRevisedExperience } from "./queries/getRevisedExperience";
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
  education: getEducation,
  skillsForProject: getSkillsForProject,

  // Full resume query.
  resume: getResume,

  // AI queries.
  revisedExperience: getRevisedExperience,
};
