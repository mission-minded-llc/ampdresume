import { addCompany } from "./resolvers/addCompany";
import { addPosition } from "./resolvers/addPosition";
import { addProject } from "./resolvers/addProject";
import { addSkillForProject } from "./resolvers/addSkillForProject";
import { addSkillForUser } from "./resolvers/addSkillForUser";
import { deleteCompany } from "./resolvers/deleteCompany";
import { deletePosition } from "./resolvers/deletePosition";
import { deleteSkillForUser } from "./resolvers/deleteSkillForUser";
import { updateCompany } from "./resolvers/updateCompany";
import { updatePosition } from "./resolvers/updatePosition";
import { updateProjectSortIndexes } from "./resolvers/updateProjectSortIndexes";
import { updateSkillForUser } from "./resolvers/updateSkillForUser";

export const mutationResolvers = {
  // Skill specific mutations.
  addSkillForUser,
  updateSkillForUser,
  deleteSkillForUser,

  // Company specific mutations.
  addCompany,
  updateCompany,
  deleteCompany,

  // Position specific mutations.
  addPosition,
  updatePosition,
  deletePosition,

  // Project specific mutations.
  addProject,
  updateProjectSortIndexes,
  addSkillForProject,
};
