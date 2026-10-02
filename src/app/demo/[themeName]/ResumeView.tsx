"use client";

import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { DemoThemePicker } from "@/app/components/DemoThemePicker";
import { getDemoPlaceholderSocials } from "@/lib/demoSocials";
import { themeDefinitions } from "@/theme";
import { demoSampleForRoute } from "@/theme/demoSample";
import { ThemeName } from "@/types";

/**
 * Demo resume for one theme route. The example stays fixed to the route.
 * The theme menu starts on that route's theme and can switch layouts immediately.
 *
 * @param themeName Theme slug from the demo URL, used as the example and the initial layout.
 * @returns The example resume and a live theme menu.
 */
export const ResumeView = ({ themeName }: { themeName: ThemeName }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(
    themeName in themeDefinitions ? themeName : "default",
  );

  useEffect(() => {
    setSelectedTheme(themeName in themeDefinitions ? themeName : "default");
  }, [themeName]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [selectedTheme]);

  const sample = demoSampleForRoute(themeName).data.resume;
  const ThemeComponent =
    themeDefinitions[selectedTheme]?.webComponent ?? themeDefinitions.default.webComponent;
  const options = Object.entries(themeDefinitions).map(([value, theme]) => ({
    value,
    label: theme.name,
    icon: theme.iconifyIcon,
  }));

  return (
    <>
      <DemoThemePicker
        label="Theme"
        value={selectedTheme}
        options={options}
        onChange={(next) => setSelectedTheme(next as ThemeName)}
      />
      <ThemeComponent
        themeAppearance={themeAppearance}
        user={sample.user}
        socials={getDemoPlaceholderSocials(sample.user)}
        skillsForUser={sample.skillsForUser}
        companies={sample.companies}
        education={sample.education}
        certifications={sample.certifications || []}
        featuredProjects={sample.featuredProjects || []}
      />
    </>
  );
};
