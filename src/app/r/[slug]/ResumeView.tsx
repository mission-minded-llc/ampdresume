"use client";

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Company, Education, SkillForUser, ThemeName, themeDefinitions } from "@ampdresume/theme";
import { Social, User } from "@ampdresume/theme";
import { useContext, useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { Session } from "next-auth";
import { ThemeAppearanceContext } from "@/app/components/ThemeContext";

export const ResumeView = ({
  session,
  slug,
  user,
  socials,
  skillsForUser,
  companies,
  education,
}: {
  session: Session | null;
  slug: string;
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
}) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(
    session?.user?.webThemeName ?? "default",
  );

  // Check for a cookie with the key "themePreview" and set a boolean value if it's present.
  const [themePreview, setThemePreview] = useState(false);
  useEffect(() => {
    const themePreviewCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme-preview="));
    setThemePreview(themePreviewCookie ? true : false);
  }, []);

  const handleThemeChange = (event: SelectChangeEvent<ThemeName>) => {
    setSelectedTheme(event.target.value as ThemeName);
  };

  const renderTheme = () => {
    const themeProps = {
      themeAppearance,
      user,
      socials,
      skillsForUser,
      companies,
      education,
    };

    const themeDefinition = themeDefinitions[selectedTheme];

    if (!themeDefinition?.webComponent) {
      const ThemeDefault = themeDefinitions["default"].webComponent;
      return <ThemeDefault {...themeProps} />;
    }

    const ThemeComponent = themeDefinition.webComponent;
    return <ThemeComponent {...themeProps} />;
  };

  return (
    <>
      {(session?.user && session.user.slug === slug) || themePreview ? (
        <Box
          sx={{
            position: "fixed",
            top: 100,
            right: 20,
            minWidth: 200,
            zIndex: 1000,
            padding: 2,
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="theme-select-label">Preview Theme</InputLabel>
            <Select
              labelId="theme-select-label"
              value={selectedTheme}
              label="Preview Theme"
              onChange={handleThemeChange}
            >
              {Object.entries(themeDefinitions).map(([key, value]) => (
                <MenuItem key={key} value={key} selected={key === session?.user?.webThemeName}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Icon icon={value.iconifyIcon} />
                    {value.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : null}
      {renderTheme()}
    </>
  );
};
