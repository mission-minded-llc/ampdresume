"use client";

import { useContext } from "react";
import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { ThemeDavids, ThemeDefault } from "@/theme";
import { themeDavidsSampleData } from "@/theme/davids/sampleData";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { ThemeName } from "@/types";

export const ResumeView = ({ themeName }: { themeName: ThemeName }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  switch (themeName) {
    case "davids":
      return (
        <ThemeDavids
          themeAppearance={themeAppearance}
          user={themeDavidsSampleData.data.resume.user}
          socials={themeDavidsSampleData.data.resume.socials}
          skillsForUser={themeDavidsSampleData.data.resume.skillsForUser}
          companies={themeDavidsSampleData.data.resume.companies}
          education={themeDavidsSampleData.data.resume.education}
          certifications={themeDavidsSampleData.data.resume.certifications || []}
        />
      );
    case "default":
    default:
      return (
        <ThemeDefault
          themeAppearance={themeAppearance}
          user={themeDefaultSampleData.data.resume.user}
          socials={themeDefaultSampleData.data.resume.socials}
          skillsForUser={themeDefaultSampleData.data.resume.skillsForUser}
          companies={themeDefaultSampleData.data.resume.companies}
          education={themeDefaultSampleData.data.resume.education}
          certifications={themeDefaultSampleData.data.resume.certifications || []}
        />
      );
  }
};
