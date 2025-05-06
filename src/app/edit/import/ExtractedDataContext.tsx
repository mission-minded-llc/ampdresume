import React, { createContext, useContext, useState } from "react";

import { ParsedResumeData } from "./types";

interface ExtractedDataContextType {
  data: ParsedResumeData | null;
  error: string | null;
  updateUser: (user: ParsedResumeData["user"]) => void;
  updateSkills: (skills: string[]) => void;
  updateCompanies: (companies: ParsedResumeData["companies"]) => void;
  updateEducation: (education: ParsedResumeData["education"]) => void;
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
  const [data, setData] = useState<ParsedResumeData | null>(initialData);

  const updateUser = (user: ParsedResumeData["user"]) => {
    setData((prev) => {
      if (!prev) return null;
      return { ...prev, user };
    });
  };

  const updateSkills = (skills: string[]) => {
    setData((prev) => {
      if (!prev) return null;
      return { ...prev, skills };
    });
  };

  const updateCompanies = (companies: ParsedResumeData["companies"]) => {
    setData((prev) => {
      if (!prev) return null;
      return { ...prev, companies };
    });
  };

  const updateEducation = (education: ParsedResumeData["education"]) => {
    setData((prev) => {
      if (!prev) return null;
      return { ...prev, education };
    });
  };

  return (
    <ExtractedDataContext.Provider
      value={{
        data,
        error: initialError,
        updateUser,
        updateSkills,
        updateSocialUrls,
        updateCompanies,
        updateEducation,
      }}
    >
      {children}
    </ExtractedDataContext.Provider>
  );
};
