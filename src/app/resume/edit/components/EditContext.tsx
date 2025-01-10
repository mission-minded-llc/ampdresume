"use client";

import { createContext, useEffect, useState } from "react";

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
  const [activeSection, setActiveSection] = useState("");

  // Supports hash-based navigation for this page's sections.
  useEffect(() => {
    const currentHash = decodeURIComponent(window.location.hash.slice(1) || "");
    setActiveSection(currentHash || sections[0].title);
  }, []);

  useEffect(() => {
    if (!activeSection) return;

    window.location.hash = activeSection;
  }, [activeSection]);

  return (
    <EditPageContext.Provider value={{ sections, activeSection, setActiveSection }}>
      {children}
    </EditPageContext.Provider>
  );
};
