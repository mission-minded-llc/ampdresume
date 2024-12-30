import { addSkillForUser } from "./resolvers/addSkillForUser";
import { deleteSkillForUser } from "./resolvers/deleteSkillForUser";
import { updateSkillForUser } from "./resolvers/updateSkillForUser";

export const mutationResolvers = {
  addSkillForUser,
  updateSkillForUser,
  deleteSkillForUser,
};
