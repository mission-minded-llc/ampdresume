import { addCompany } from "./mutations/addCompany";
import { addCertification } from "./mutations/addCertification";
import { addEducation } from "./mutations/addEducation";
import { addFeaturedProject } from "./mutations/addFeaturedProject";
import { addPosition } from "./mutations/addPosition";
import { addProject } from "./mutations/addProject";
import { addSkill } from "./mutations/addSkill";
import { addSkillForProject } from "./mutations/addSkillForProject";
import { addSkillForUser } from "./mutations/addSkillForUser";
import { addSocial } from "./mutations/addSocial";
import { deleteCertification } from "./mutations/deleteCertification";
import { deleteCompany } from "./mutations/deleteCompany";
import { deleteEducation } from "./mutations/deleteEducation";
import { deleteFeaturedProject } from "./mutations/deleteFeaturedProject";
import { deletePosition } from "./mutations/deletePosition";
import { deleteProject } from "./mutations/deleteProject";
import { deleteSkillForProject } from "./mutations/deleteSkillForProject";
import { deleteSkillForUser } from "./mutations/deleteSkillForUser";
import { deleteSocial } from "./mutations/deleteSocial";
import { deleteUser } from "./mutations/deleteUser";
import { saveExtractedResumeData } from "./mutations/saveExtractedResumeData";
import { updateCertification } from "./mutations/updateCertification";
import { updateCompany } from "./mutations/updateCompany";
import { updateEducation } from "./mutations/updateEducation";
import { updateFeaturedProject } from "./mutations/updateFeaturedProject";
import { updatePosition } from "./mutations/updatePosition";
import { updateProject } from "./mutations/updateProject";
import { updateProjectSortIndexes } from "./mutations/updateProjectSortIndexes";
import { updateSkillForProject } from "./mutations/updateSkillForProject";
import { updateSkillForUser } from "./mutations/updateSkillForUser";
import { updateSocial } from "./mutations/updateSocial";
import { updateUser } from "./mutations/updateUser";

export const mutationResolvers = {
  // User specific mutations.
  updateUser,
  deleteUser,
  addSkill,
  addSkillForUser,
  updateSkillForUser,
  deleteSkillForUser,
  addSocial,
  deleteSocial,
  updateSocial,

  // Save all extracted resume data at once
  saveExtractedResumeData,

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

  // Certification specific mutations.
  addCertification,
  updateCertification,
  deleteCertification,

  // Featured Project specific mutations.
  addFeaturedProject,
  updateFeaturedProject,
  deleteFeaturedProject,
};
