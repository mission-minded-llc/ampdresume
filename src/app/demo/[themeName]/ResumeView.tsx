"use client";

import { useContext } from "react";
import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { getDemoPlaceholderSocials } from "@/lib/demoSocials";
import { ThemeDavids, ThemeDefault, ThemeRetro80s } from "@/theme";
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
          socials={getDemoPlaceholderSocials(themeDavidsSampleData.data.resume.user)}
          skillsForUser={themeDavidsSampleData.data.resume.skillsForUser}
          companies={themeDavidsSampleData.data.resume.companies}
          education={themeDavidsSampleData.data.resume.education}
          certifications={themeDavidsSampleData.data.resume.certifications || []}
          featuredProjects={themeDavidsSampleData.data.resume.featuredProjects || []}
        />
      );
    case "retro-80s":
      return (
        <ThemeRetro80s
          themeAppearance={themeAppearance}
          user={themeDefaultSampleData.data.resume.user}
          socials={getDemoPlaceholderSocials(themeDefaultSampleData.data.resume.user)}
          skillsForUser={themeDefaultSampleData.data.resume.skillsForUser}
          companies={themeDefaultSampleData.data.resume.companies}
          education={themeDefaultSampleData.data.resume.education}
          certifications={themeDefaultSampleData.data.resume.certifications || []}
          featuredProjects={themeDefaultSampleData.data.resume.featuredProjects || []}
        />
      );
    case "default":
    default:
      return (
        <ThemeDefault
          themeAppearance={themeAppearance}
          user={themeDefaultSampleData.data.resume.user}
          socials={getDemoPlaceholderSocials(themeDefaultSampleData.data.resume.user)}
          skillsForUser={themeDefaultSampleData.data.resume.skillsForUser}
          companies={themeDefaultSampleData.data.resume.companies}
          education={themeDefaultSampleData.data.resume.education}
          certifications={themeDefaultSampleData.data.resume.certifications || []}
          featuredProjects={themeDefaultSampleData.data.resume.featuredProjects || []}
        />
      );
  }
};
