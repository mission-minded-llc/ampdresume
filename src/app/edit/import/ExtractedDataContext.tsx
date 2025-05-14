import React, { createContext, useContext, useState } from "react";

import { ParsedResumeData } from "./types";
import { Skill } from "@openresume/theme";

interface ExtractedDataContextType {
  user: ParsedResumeData["user"] | null;
  skills: Skill[];
  companies: ParsedResumeData["companies"];
  education: ParsedResumeData["education"];
  error: string | null;
  setUser: (user: ParsedResumeData["user"]) => void;
  setSkills: (skills: Skill[]) => void;
  setCompanies: (companies: ParsedResumeData["companies"]) => void;
  setEducation: (education: ParsedResumeData["education"]) => void;
}

const ExtractedDataContext = createContext<ExtractedDataContextType | null>(null);

export const useExtractedData = () => {
  const context = useContext(ExtractedDataContext);
  if (!context) {
    throw new Error("useExtractedData must be used within an ExtractedDataProvider");
  }
  return context;
};

interface ExtractedDataProviderProps {
  initialData: ParsedResumeData | null;
  initialError: string | null;
  children: React.ReactNode;
}

export const ExtractedDataProvider = ({
  initialData,
  initialError,
  children,
}: ExtractedDataProviderProps) => {
  const [user, setUser] = useState<ParsedResumeData["user"] | null>(initialData?.user || null);
  const [skills, setSkills] = useState<Skill[]>(initialData?.skills || []);
  const [companies, setCompanies] = useState<ParsedResumeData["companies"]>(
    initialData?.companies || [],
  );
  const [education, setEducation] = useState<ParsedResumeData["education"]>(
    initialData?.education || [],
  );

  const contextValue = {
    user,
    skills,
    companies,
    education,
    error: initialError,
    setUser,
    setSkills,
    setCompanies,
    setEducation,
  };

  return (
    <ExtractedDataContext.Provider value={contextValue}>{children}</ExtractedDataContext.Provider>
  );
};
