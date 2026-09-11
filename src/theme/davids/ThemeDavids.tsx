"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  createTheme,
  Fade,
  IconButton,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { Education } from "@/theme/components/Education/Education";
import {
  Company,
  Education as EducationType,
  FeaturedProject,
  SkillForUser,
  Social,
  ThemeAppearance,
  User,
  Certification,
} from "@/types";
import { generateSocialUrl, getSocialIcon } from "@/util/social";
import { QRGenerator } from "./components/QRGenerator";
import { SkillsSection } from "./components/SkillsSection";
import { Summary } from "./components/Summary";
import { WorkExperienceSection } from "./components/WorkExperience";
import { CertificationsSection } from "./components/Certifications";
import { FeaturedProjects } from "./components/FeaturedProjects";

// Theme color constants
const COLORS = {
  navyBlue: "#0d47a1",
  lightBlue: "#bbdefb",
  darkNavy: "#0a1929",
  darkSlate: "#1e293b",
  brightBlue: "#60a5fa",
  lightBlueHover: "#90caf9",
  lightBlueBg: "#e3f2fd",
  lightText: "#ADD8E6",
  darkNavyDarker: "#08306b",
  darkBlue: "#1e40af",
  darkBlueHover: "#1d4ed8",
  darkBlueBorder: "#3b82f6",
} as const;

// Social platform configurations
const SOCIAL_PLATFORMS = {
  "github.com": {
    icon: "mdi:github",
    url: (ref: string) => `https://github.com/${ref}`,
  },
  "linkedin.com": {
    icon: "devicon:linkedin",
    url: (ref: string) => `https://www.linkedin.com/in/${ref}`,
  },
  "x.com": {
    icon: "ri:twitter-x-fill",
    url: (ref: string) => `https://x.com/${ref}`,
  },
  "twitter.com": {
    icon: "ri:twitter-x-fill",
    url: (ref: string) => `https://x.com/${ref}`,
  },
} as const;

export const ThemeDavids = ({
  themeAppearance,
  user,
  socials,
  skillsForUser,
  companies,
  education,
  certifications,
  featuredProjects,
}: {
  themeAppearance: ThemeAppearance;
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
  certifications: Certification[];
  featuredProjects: FeaturedProject[];
}) => {
  const [active, setActive] = useState<number>(0);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // Computed theme colors
  const themeColors = {
    text: themeAppearance === "dark" ? COLORS.lightText : COLORS.navyBlue,
    background: themeAppearance === "dark" ? COLORS.darkNavy : COLORS.navyBlue,
    paper: themeAppearance === "dark" ? COLORS.darkSlate : COLORS.lightBlue,
    primary: themeAppearance === "dark" ? COLORS.brightBlue : COLORS.navyBlue,
    buttonBg: themeAppearance === "dark" ? COLORS.darkBlue : COLORS.lightBlue,
    buttonHover: themeAppearance === "dark" ? COLORS.darkBlueHover : COLORS.lightBlueHover,
    buttonBorder: themeAppearance === "dark" ? COLORS.darkBlueBorder : COLORS.navyBlue,
    hoverBg: themeAppearance === "dark" ? "transparent" : COLORS.lightBlueBg,
  };

  const pathname = usePathname();
  const pdfUrl = `${pathname}/pdf`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const sections: { label: string; render: React.ReactElement | null }[] = [
    {
      label: "Skills",
      render: skillsForUser?.length ? <SkillsSection skillsForUser={skillsForUser} /> : null,
    },
    {
      label: "Work Experience",
      render: companies?.length ? <WorkExperienceSection companies={companies} /> : null,
    },
    {
      label: "Featured Projects",
      render: featuredProjects?.length ? <FeaturedProjects projects={featuredProjects} /> : null,
    },
    {
      label: "Education",
      render: education?.length ? <Education education={education} /> : null,
    },
    {
      label: "Certifications",
      render: certifications?.length ? (
        <CertificationsSection certifications={certifications} />
      ) : null,
    },
  ].filter((section) => section.render !== null);

  const cycle = (delta: number) => {
    setActive((prev) => (prev + delta + sections.length) % sections.length);
  };

  /**
   * Navy theme with dark mode support.
   */
  const navyTheme = createTheme({
    palette: {
      mode: themeAppearance,
      background: {
        default: themeColors.background,
        paper: themeColors.paper,
      },
      primary: {
        main: themeColors.primary,
        dark: themeAppearance === "dark" ? COLORS.brightBlue : COLORS.darkNavyDarker,
        light: themeAppearance === "dark" ? COLORS.brightBlue : COLORS.lightBlue,
        contrastText: themeAppearance === "dark" ? "#ffffff" : "#000000",
      },
      secondary: {
        main: themeAppearance === "dark" ? COLORS.brightBlue : "#1565c0",
      },
      text: {
        primary: themeColors.text,
        secondary: themeColors.text,
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      button: {
        textTransform: "none",
        fontWeight: 650,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 999,
            boxShadow: "none",
          },
          outlinedPrimary: {
            color: themeAppearance === "dark" ? "#ffffff" : "#000000",
            backgroundColor: themeColors.buttonBg,
            borderColor: themeColors.buttonBorder,
            "&:hover": {
              backgroundColor: themeColors.buttonHover,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: 3,
            borderRadius: 999,
            backgroundColor: themeColors.text,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            minHeight: 44,
            borderRadius: 999,
            fontWeight: 650,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: `${themeColors.text} !important`,
            "&:hover": {
              backgroundColor: themeColors.hoverBg,
              color: `${themeColors.text} !important`,
            },
            "&:focus": {
              backgroundColor: themeColors.hoverBg,
              color: `${themeColors.text} !important`,
            },
            "&:active": {
              backgroundColor:
                themeAppearance === "dark" ? "rgba(255, 255, 255, 0.05)" : COLORS.lightBlue,
              color: `${themeColors.text} !important`,
            },
            "&.Mui-focusVisible": {
              backgroundColor: themeColors.hoverBg,
              color: `${themeColors.text} !important`,
            },
            "& .MuiSvgIcon-root": {
              color: `${themeColors.text} !important`,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={navyTheme}>
      <Box
        component="main"
        sx={{
          position: "relative",
          display: "block",
          maxWidth: "1024px",
          margin: "0 auto",
          paddingBottom: "100px",
        }}
      >
        <Box sx={{ textAlign: "center", mt: 8, mb: 0, px: { xs: 2, sm: 0 } }}>
          <Box
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem" },
              fontWeight: 750,
              letterSpacing: "-0.03em",
            }}
          >
            {user?.name}
          </Box>
          <Box
            component="span"
            sx={{
              display: "block",
              fontSize: { xs: "1.15rem", sm: "1.35rem" },
              mt: 1.25,
              fontWeight: 500,
              opacity: 0.9,
            }}
          >
            {user?.title}
          </Box>

          <Box component="span" sx={{ display: "block", mt: 1, fontSize: "1rem", opacity: 0.85 }}>
            {user?.displayEmail}
            {user?.displayEmail && user?.location ? (
              <Box
                component="span"
                sx={{
                  margin: "0 0.65rem",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  opacity: 0.55,
                  display: "inline",
                }}
              >
                ·
              </Box>
            ) : null}
            {user?.location}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              mt: 2.5,
              gap: 1.5,
            }}
          >
            {socials?.map((social) => {
              const platform = social.platform.toLowerCase();
              const platformConfig = SOCIAL_PLATFORMS[platform as keyof typeof SOCIAL_PLATFORMS];

              const icon = platformConfig?.icon ?? getSocialIcon(social);
              const url = platformConfig?.url(social.ref) ?? generateSocialUrl(social);

              return (
                <Box
                  key={social.id}
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    p: 0.75,
                    borderRadius: 2,
                    color: themeColors.text,
                    "&:hover": {
                      backgroundColor:
                        themeAppearance === "dark"
                          ? "rgba(96, 165, 250, 0.12)"
                          : "rgba(13, 71, 161, 0.08)",
                    },
                  }}
                >
                  <Icon icon={icon} width="28" height="28" color={themeColors.text} />
                </Box>
              );
            })}
            <Typography
              component="a"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 0.6,
                borderRadius: 999,
                border: `1px solid ${themeColors.text}`,
                color: themeColors.text,
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 650,
              }}
            >
              <Icon icon="catppuccin:pdf" width="20" height="20" color={themeColors.text} />
              View PDF
            </Typography>
          </Box>
        </Box>

        <Summary user={user} />

        {/* Tabs & Nav buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <IconButton
            onClick={() => cycle(-1)}
            aria-label="Previous section"
            sx={{
              color: themeColors.text,
              backgroundColor:
                themeAppearance === "dark" ? "rgba(96, 165, 250, 0.1)" : "rgba(13, 71, 161, 0.06)",
              "& .MuiSvgIcon-root": {
                color: themeColors.text,
              },
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Tabs
            value={active}
            onChange={(_, v) => setActive(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mx: 1 }}
          >
            {sections.map((s, idx) => (
              <Tab
                key={s.label}
                label={s.label}
                value={idx}
                sx={{
                  color: themeColors.text,
                  "&.Mui-selected": {
                    color: themeColors.text,
                  },
                  "&:hover": {
                    color: themeColors.text,
                  },
                }}
              />
            ))}
          </Tabs>
          <IconButton
            onClick={() => cycle(1)}
            aria-label="Next section"
            sx={{
              color: themeColors.text,
              backgroundColor:
                themeAppearance === "dark" ? "rgba(96, 165, 250, 0.1)" : "rgba(13, 71, 161, 0.06)",
              "& .MuiSvgIcon-root": {
                color: themeColors.text,
              },
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>

        <Fade in key={active} timeout={500} unmountOnExit mountOnEnter>
          <Box
            sx={{
              mt: 3,
              px: { xs: 2, sm: 3 },
              py: { xs: 2, sm: 3 },
              borderRadius: 3,
              backgroundColor:
                themeAppearance === "dark" ? "rgba(30, 41, 59, 0.55)" : "rgba(227, 242, 253, 0.55)",
              border: `1px solid ${
                themeAppearance === "dark" ? "rgba(96, 165, 250, 0.18)" : "rgba(13, 71, 161, 0.1)"
              }`,
            }}
          >
            {sections[active]?.render}
          </Box>
        </Fade>

        <QRGenerator url={currentUrl} user={user} />
      </Box>
    </ThemeProvider>
  );
};
