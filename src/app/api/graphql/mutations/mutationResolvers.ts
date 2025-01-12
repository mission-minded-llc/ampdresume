import { addCompany } from "./resolvers/addCompany";
import { addSkillForUser } from "./resolvers/addSkillForUser";
import { deleteSkillForUser } from "./resolvers/deleteSkillForUser";
import { updateCompany } from "./resolvers/updateCompany";
import { updateSkillForUser } from "./resolvers/updateSkillForUser";

export const mutationResolvers = {
  addSkillForUser,
  updateSkillForUser,
  deleteSkillForUser,
  addCompany,
  updateCompany,
};
