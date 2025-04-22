import { getCompanies } from "./queries/getCompanies";
import { getCompaniesAi } from "./queries/getCompaniesAi";
import { getEducation } from "./queries/getEducation";
import { getExperience } from "./queries/getExperience";
import { getPositions } from "./queries/getPositions";
import { getResume } from "./queries/getResume";
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

  experience: getExperience,
  companies: getCompanies,
  positions: getPositions,
  education: getEducation,
  skillsForProject: getSkillsForProject,

  // Edit page queries.
  // These queries are more granular, allowing fetching of specific
  // sections of data for the edit page.
  // For example, you might want to fetch only the skills for a specific project
  // or the education details without fetching the entire user profile.
  // This is useful for optimizing data fetching and reducing the amount of data
  // transferred over the network.

  // Full resume query.
  resume: getResume,

  // AI queries.
  companiesAi: getCompaniesAi,
};
