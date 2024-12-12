"use client";

import { PositionWithProjects } from "@/graphql/getPositions";
import { SkillForUserWithSkill } from "@/graphql/getSkills";
import { Company, Education } from "@prisma/client";
import { createContext } from "react";

interface ResumeProviderProps {
  skills: SkillForUserWithSkill[];
  companies: Company[];
  positions: PositionWithProjects[];
  education: Education[];
}

export const ResumeContext = createContext<ResumeProviderProps>({
  skills: [],
  companies: [],
  positions: [],
  education: [],
});

export const ResumeProvider = ({
  children,
  skills,
  companies,
  positions,
  education,
}: ResumeProviderProps & { children?: React.ReactNode }) => (
  <ResumeContext.Provider value={{ skills, companies, positions, education }}>
    {children}
  </ResumeContext.Provider>
);
