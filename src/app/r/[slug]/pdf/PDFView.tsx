"use client";

import { useEffect, useState } from "react";
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
import { Session } from "next-auth";
import { FloatingThemePicker } from "@/app/components/FloatingThemePicker";
import { PdfDocumentFrame } from "@/app/components/PdfDocumentFrame";
import { updateUser } from "@/graphql/updateUser";
import { isDemoResume } from "@/lib/demoResume";
import { getPdfThemeDefinition, pdfThemeDefinitions, resolvePdfThemeName } from "@/theme";
import {
  Certification,
  Company,
  Education,
  FeaturedProject,
  PdfThemeName,
  SkillForUser,
  User,
} from "@/types";
import { getEnvironmentName } from "@/util/url";

interface PDFViewProps {
  user: User;
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
  certifications: Certification[];
  featuredProjects: FeaturedProject[];
  pdfThemeName?: string | null;
  session?: Session | null;
  slug?: string;
}

export const PDFView = ({
  user,
  skillsForUser,
  companies,
  education,
  certifications,
  featuredProjects,
  pdfThemeName,
  session = null,
  slug,
}: PDFViewProps) => {
  const [selectedPdfTheme, setSelectedPdfTheme] = useState<PdfThemeName>(
    resolvePdfThemeName(pdfThemeName),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [themePreview, setThemePreview] = useState(false);

  const isProduction = getEnvironmentName() === "production";
  const isOwner = Boolean(session?.user?.slug && slug && session.user.slug === slug);
  const showPdfThemePicker = isOwner || themePreview;

  useEffect(() => {
    const themePreviewCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme-preview="));
    setThemePreview(themePreviewCookie ? true : false);
  }, []);

  const handlePdfThemeChange = (event: SelectChangeEvent<PdfThemeName>) => {
    setSelectedPdfTheme(event.target.value as PdfThemeName);
  };

  const handleSavePdfTheme = async () => {
    if (!session?.user?.id) return;

    setIsSaving(true);
    try {
      await updateUser({
        userId: session.user.id,
        pdfThemeName: selectedPdfTheme,
      });
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      setIsSaving(false);
    }
  };

  const PdfComponent = getPdfThemeDefinition(selectedPdfTheme).component;

  return (
    <>
      {showPdfThemePicker ? (
        <FloatingThemePicker>
          <FormControl fullWidth size="small">
            <InputLabel id="pdf-theme-select-label">PDF Theme</InputLabel>
            <Select
              labelId="pdf-theme-select-label"
              value={selectedPdfTheme}
              label="PDF Theme"
              onChange={handlePdfThemeChange}
            >
              {Object.entries(pdfThemeDefinitions).map(([key, value]) => {
                if (isProduction && !value.published && !themePreview) return null;

                return (
                  <MenuItem key={key} value={key}>
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
            onClick={handleSavePdfTheme}
            disabled={isSaving || !session?.user?.id}
            sx={{ mt: 0.75 }}
            fullWidth
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </FloatingThemePicker>
      ) : null}
      <PdfDocumentFrame showDemoTag={isDemoResume(user)}>
        <PdfComponent
          user={user}
          skillsForUser={skillsForUser}
          companies={companies}
          education={education}
          certifications={certifications}
          featuredProjects={featuredProjects}
        />
      </PdfDocumentFrame>
    </>
  );
};
