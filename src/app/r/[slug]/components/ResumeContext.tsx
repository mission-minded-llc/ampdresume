"use client";

import { Company, Education } from "@prisma/client";

import { PositionWithProjects } from "@/graphql/getPositions";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { createContext } from "react";

interface ResumeProviderProps {
  skillsForUser: SkillForUserWithSkill[];
  companies: Company[];
  positions: PositionWithProjects[];
  education: Education[];
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
