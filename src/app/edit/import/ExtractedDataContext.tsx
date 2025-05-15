import React, { createContext, useContext, useState } from "react";

import { ParsedResumeData } from "./types";
import { Skill } from "@openresume/theme";

/**
 * The context for the extracted data.
 */
const ExtractedDataContext = createContext<{
  user: ParsedResumeData["user"] | null;
  skills: Skill[];
  companies: ParsedResumeData["companies"];
  education: ParsedResumeData["education"];
  error: string | null;
  setUser: React.Dispatch<React.SetStateAction<ParsedResumeData["user"] | null>>;
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  setCompanies: React.Dispatch<React.SetStateAction<ParsedResumeData["companies"]>>;
  setEducation: React.Dispatch<React.SetStateAction<ParsedResumeData["education"]>>;
} | null>(null);

/**
 * Hook to access the extracted data context.
 *
 * @returns The extracted data context.
 */
export const useExtractedData = () => {
  const context = useContext(ExtractedDataContext);
  if (!context) {
    throw new Error("useExtractedData must be used within an ExtractedDataProvider");
  }

  return context;
};

/**
 * Provider for the extracted data context.
 *
 * @param initialData The initial data to set in the context.
 * @param initialError The initial error to set in the context.
 * @param children The children to render within the provider.
 * @returns The extracted data provider.
 */
export const ExtractedDataProvider = ({
  initialData,
  initialError,
  children,
}: {
  initialData: ParsedResumeData | null;
  initialError: string | null;
  children: React.ReactNode;
}) => {
  /**
   * Extract the separate objects from the parsed resume data, to use as individual
   * state variables.
   */
  const [user, setUser] = useState<ParsedResumeData["user"] | null>(initialData?.user || null);
  const [skills, setSkills] = useState<Skill[]>(initialData?.skills || []);
  const [companies, setCompanies] = useState<ParsedResumeData["companies"]>(
    initialData?.companies || [],
  );
  const [education, setEducation] = useState<ParsedResumeData["education"]>(
    initialData?.education || [],
  );

  return (
    <ExtractedDataContext.Provider
      value={{
        user,
        skills,
        companies,
        education,
        error: initialError,
        setUser,
        setSkills,
        setCompanies,
        setEducation,
      }}
    >
      {children}
    </ExtractedDataContext.Provider>
  );
};
