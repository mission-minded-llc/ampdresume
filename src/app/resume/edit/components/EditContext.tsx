"use client";

import { createContext, useState } from "react";

export interface EditSection {
  title: string;
}

const sections: EditSection[] = [
  {
    title: "Skills",
  },
  {
    title: "Professional Experience",
  },
  {
    title: "Education",
  },
];

interface EditPageProviderProps {
  sections: EditSection[];
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const EditPageContext = createContext<EditPageProviderProps>({
  sections,
  activeSection: sections[0].title,
  setActiveSection: () => {},
});

export const EditPageProvider = ({ children }: { children?: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState(sections[0].title);

  return (
    <EditPageContext.Provider value={{ sections, activeSection, setActiveSection }}>
      {children}
    </EditPageContext.Provider>
  );
};
