import { addCompany } from "./mutations/addCompany";
import { addEducation } from "./mutations/addEducation";
import { addPosition } from "./mutations/addPosition";
import { addProject } from "./mutations/addProject";
import { addSkillForProject } from "./mutations/addSkillForProject";
import { addSkillForUser } from "./mutations/addSkillForUser";
import { addSocial } from "./mutations/addSocial";
import { deleteCompany } from "./mutations/deleteCompany";
import { deleteEducation } from "./mutations/deleteEducation";
import { deletePosition } from "./mutations/deletePosition";
import { deleteProject } from "./mutations/deleteProject";
import { deleteSkillForProject } from "./mutations/deleteSkillForProject";
import { deleteSkillForUser } from "./mutations/deleteSkillForUser";
import { deleteSocial } from "./mutations/deleteSocial";
import { updateCompany } from "./mutations/updateCompany";
import { updateEducation } from "./mutations/updateEducation";
import { updatePosition } from "./mutations/updatePosition";
import { updateProject } from "./mutations/updateProject";
import { updateProjectSortIndexes } from "./mutations/updateProjectSortIndexes";
import { updateSkillForProject } from "./mutations/updateSkillForProject";
import { updateSkillForUser } from "./mutations/updateSkillForUser";

export const mutationResolvers = {
  // User specific mutations.
  addSkillForUser,
  updateSkillForUser,
  deleteSkillForUser,
  addSocial,
  deleteSocial,

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
  updateProject,
  deleteProject,
  updateProjectSortIndexes,
  addSkillForProject,
  updateSkillForProject,
  deleteSkillForProject,

  // Education specific mutations.
  addEducation,
  updateEducation,
  deleteEducation,
};
