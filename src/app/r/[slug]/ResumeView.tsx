"use client";

import {
  Certification,
  Company,
  Education,
  FeaturedProject,
  SkillForUser,
  Social,
  ThemeName,
} from "@/types";
import { themeDefinitions } from "@/theme";
import { Session } from "next-auth";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Icon } from "@iconify/react";
import * as Sentry from "@sentry/react";
import { FloatingThemePicker } from "@/app/components/FloatingThemePicker";
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
  certifications,
  featuredProjects,
}: {
  session: Session | null;
  slug: string;
  user: UserWithTheme;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
  certifications: Certification[];
  featuredProjects: FeaturedProject[];
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
      certifications,
      featuredProjects,
    };

    const themeDefinition = themeDefinitions[selectedTheme];
    const ThemeComponent =
      themeDefinition?.webComponent ?? themeDefinitions["default"].webComponent;

    return (
      <Box data-testid={`resume-theme-${selectedTheme}`} sx={{ display: "contents" }}>
        <ThemeComponent {...themeProps} />
      </Box>
    );
  };

  return (
    <>
      {(session?.user && session.user.slug === slug) || themePreview ? (
        <FloatingThemePicker>
          <FormControl fullWidth size="small">
            <InputLabel id="theme-select-label">Theme</InputLabel>
            <Select
              labelId="theme-select-label"
              value={selectedTheme}
              label="Theme"
              onChange={handleThemeChange}
            >
              {Object.entries(themeDefinitions).map(([key, value]) => {
                if (isProduction && !value.published && !themePreview) return null;

                return (
                  <MenuItem key={key} value={key} selected={key === session?.user?.webThemeName}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Icon icon={value.iconifyIcon} width={16} height={16} />
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
            size="small"
            onClick={handleSaveTheme}
            disabled={isSaving || !session?.user?.id}
            sx={{ mt: 0.75 }}
            fullWidth
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </FloatingThemePicker>
      ) : null}
      {renderTheme()}
    </>
  );
};
