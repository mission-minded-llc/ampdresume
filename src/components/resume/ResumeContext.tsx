"use client";

import { CompanyGraphql } from "@/graphql/getCompanies";
import { EducationGraphql } from "@/graphql/getEducation";
import { PositionWithProjectsGraphql } from "@/graphql/getPositions";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { createContext } from "react";

interface ResumeProviderProps {
  skillsForUser: SkillForUserWithSkill[];
  companies: CompanyGraphql[];
  positions: PositionWithProjectsGraphql[];
  education: EducationGraphql[];
}

export const ResumeContext = createContext<ResumeProviderProps>({
  skillsForUser: [],
  companies: [],
  positions: [],
  education: [],
});

export const ResumeProvider = ({
  children,
  skillsForUser,
  companies,
  positions,
  education,
}: ResumeProviderProps & { children?: React.ReactNode }) => (
  <ResumeContext.Provider value={{ skillsForUser, companies, positions, education }}>
    {children}
  </ResumeContext.Provider>
);
