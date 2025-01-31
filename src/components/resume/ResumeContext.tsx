"use client";

import { Company } from "@/graphql/getCompanies";
import { Education } from "@/graphql/getEducation";
import { PositionWithProjects } from "@/graphql/getPositionsWithProjects";
import { PositionWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { createContext } from "react";

interface ResumeProviderProps {
  skillsForUser: SkillForUserWithSkill[];
  companies: Company[];
  positionsWithProjects: PositionWithProjects[];
  positionsWithSkillsForProjects: PositionWithSkillsForProjects[];
  education: Education[];
}

export const ResumeContext = createContext<ResumeProviderProps>({
  skillsForUser: [],
  companies: [],
  positionsWithProjects: [],
  positionsWithSkillsForProjects: [],
  education: [],
});

export const ResumeProvider = ({
  children,
  skillsForUser,
  companies,
  positionsWithProjects,
  positionsWithSkillsForProjects,
  education,
}: ResumeProviderProps & { children?: React.ReactNode }) => (
  <ResumeContext.Provider
    value={{
      skillsForUser,
      companies,
      positionsWithProjects,
      positionsWithSkillsForProjects,
      education,
    }}
  >
    {children}
  </ResumeContext.Provider>
);
