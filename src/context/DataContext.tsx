"use client";

import { PositionWithProjects } from "@/graphql/getPositions";
import { SkillForUserWithSkill } from "@/graphql/getSkills";
import { Company, Education } from "@prisma/client";
import { createContext } from "react";

interface DataProviderProps {
  skills: SkillForUserWithSkill[];
  companies: Company[];
  positions: PositionWithProjects[];
  education: Education[];
}

export const DataContext = createContext<DataProviderProps>({
  skills: [],
  companies: [],
  positions: [],
  education: [],
});

export const DataProvider = ({
  children,
  skills,
  companies,
  positions,
  education,
}: DataProviderProps & { children?: React.ReactNode }) => (
  <DataContext.Provider value={{ skills, companies, positions, education }}>
    {children}
  </DataContext.Provider>
);
