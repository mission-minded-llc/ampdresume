"use client";

import {
  Company,
  Education,
  SkillForUser,
  ThemeName,
  themeDefinitions,
  Social,
} from "@ampdresume/theme";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import * as Sentry from "@sentry/react";
import { Session } from "next-auth";
import { useContext, useEffect, useState } from "react";

import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { UserWithTheme } from "@/graphql/getResume";
import { updateUser } from "@/graphql/updateUser";
import { getEnvironmentName } from "@/util/url";

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
  user: UserWithTheme;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
}) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(user?.webThemeName ?? "default");
  const [isSaving, setIsSaving] = useState(false);

  // Used to hide unpublished themes in the theme selector.
  const isProduction = getEnvironmentName() === "production";

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

  const handleSaveTheme = async () => {
    if (!session?.user?.id) return;

    setIsSaving(true);
    try {
      await updateUser({
        userId: session.user.id,
        webThemeName: selectedTheme,
      });
      // Theme saved successfully - the session will be updated on next page refresh
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      setIsSaving(false);
    }
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
            bottom: 30,
            right: 0,
            minWidth: 250,
            maxWidth: "100%",
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
              {Object.entries(themeDefinitions).map(([key, value]) => {
                if (isProduction && !value.published && !themePreview) return null;

                return (
                  <MenuItem key={key} value={key} selected={key === session?.user?.webThemeName}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Icon icon={value.iconifyIcon} />
                      {value.name}
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveTheme}
            disabled={isSaving || !session?.user?.id}
            sx={{ mt: 1 }}
          >
            {isSaving ? "Saving..." : "Save Theme"}
          </Button>
        </Box>
      ) : null}
      {renderTheme()}
    </>
  );
};
