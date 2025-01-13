import { addCompany } from "./resolvers/addCompany";
import { addPosition } from "./resolvers/addPosition";
import { addSkillForUser } from "./resolvers/addSkillForUser";
import { deleteCompany } from "./resolvers/deleteCompany";
import { deletePosition } from "./resolvers/deletePosition";
import { deleteSkillForUser } from "./resolvers/deleteSkillForUser";
import { updateCompany } from "./resolvers/updateCompany";
import { updatePosition } from "./resolvers/updatePosition";
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
};
