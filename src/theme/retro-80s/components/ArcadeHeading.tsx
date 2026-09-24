"use client";

import { usePathname } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { DemoResumeChip } from "@/app/components/DemoResumeTag";
import { shouldShowDemoResumeTag } from "@/lib/demoResume";
import { Social, User } from "@/types";
import {
  generateSocialUrl,
  getSocialIcon,
  getSocialMediaPlatformByPlatformName,
} from "@/util/social";
import {
  getRetroPalette,
  MONO_FONT,
  PIXEL_FONT,
  pixelLabel,
  pixelPressEffect,
  pixelShadow,
} from "../styles";

/**
 * The resume header styled as an arcade attract screen: a HUD strip, the name in
 * chromatic-aberration pixel type, and socials rendered as cabinet buttons.
 */
export const ArcadeHeading = ({ user, socials }: { user: User; socials: Social[] }) => {
  const pathname = usePathname();
  const pdfUrl = `${pathname}/pdf`;

  return (
    <Box
      component="header"
      sx={(theme) => {
        const retro = getRetroPalette(theme.palette.mode);

        return {
          position: "relative",
          mt: 6,
          p: 3,
          backgroundColor: retro.panel,
          border: `3px solid ${retro.border}`,
          boxShadow: pixelShadow(retro, 8),
          [theme.breakpoints.down("sm")]: {
            mt: 2,
            p: 2,
          },
        };
      }}
    >
      {/* HUD strip. */}
      <Box
        sx={(theme) => {
          const retro = getRetroPalette(theme.palette.mode);

          return {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            pb: 1.5,
            mb: 2,
            borderBottom: `2px dashed ${retro.dim}`,
          };
        }}
      >
        <Box
          component="span"
          sx={(theme) => ({
            ...pixelLabel(getRetroPalette(theme.palette.mode).accent),
            "@keyframes retroBlink": {
              "0%, 49%": { opacity: 1 },
              "50%, 100%": { opacity: 0.15 },
            },
            animation: "retroBlink 1.1s steps(1, end) infinite",
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          })}
        >
          Select Player
        </Box>
        {user?.location ? (
          <Box
            component="span"
            sx={(theme) => pixelLabel(getRetroPalette(theme.palette.mode).accentAlt)}
          >
            Zone: {user.location}
          </Box>
        ) : null}
      </Box>

      <Typography
        component="h1"
        sx={(theme) => {
          const retro = getRetroPalette(theme.palette.mode);

          return {
            fontFamily: PIXEL_FONT,
            fontSize: "2rem",
            fontWeight: 400,
            lineHeight: 1.4,
            color: retro.ink,
            // Offset colour ghosts, the way a CRT smears bright pixel type.
            textShadow: `4px 4px 0 ${retro.ghost}, -3px -3px 0 ${retro.accentAlt}`,
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.1rem",
              textShadow: `3px 3px 0 ${retro.ghost}, -2px -2px 0 ${retro.accentAlt}`,
            },
          };
        }}
      >
        {user?.name}
      </Typography>

      {user?.title ? (
        <Typography
          component="p"
          sx={(theme) => {
            const retro = getRetroPalette(theme.palette.mode);

            return {
              mt: 2,
              fontFamily: MONO_FONT,
              fontSize: "1.05rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: retro.inkMuted,
              "&::before": {
                content: '"\\25B8 "',
                color: retro.highlight,
              },
            };
          }}
        >
          {user.title}
        </Typography>
      ) : null}

      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mt: 3,
          [theme.breakpoints.down("sm")]: {
            gap: 1.5,
          },
        })}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center" }}>
          {socials?.map((social) => {
            const platformName = getSocialMediaPlatformByPlatformName(social.platform).name;
            const ariaLabel = `${platformName} profile for ${user?.name || "user"}`;

            return (
              <Box
                key={social.id}
                component="span"
                sx={(theme) => {
                  const retro = getRetroPalette(theme.palette.mode);

                  return {
                    display: "inline-flex",
                    "& a": {
                      display: "inline-flex",
                      p: 1,
                      color: retro.ink,
                      backgroundColor: retro.surfaceAlt,
                      border: `2px solid ${retro.border}`,
                      textDecoration: "none",
                      ...pixelPressEffect(retro),
                      "&:hover": {
                        ...pixelPressEffect(retro)["&:hover"],
                        color: retro.accent,
                      },
                    },
                  };
                }}
              >
                <a href={generateSocialUrl(social)} target="_blank" aria-label={ariaLabel}>
                  <Icon icon={getSocialIcon(social)} width="24" height="24" />
                </a>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {shouldShowDemoResumeTag(user, pathname) ? <DemoResumeChip /> : null}
          <Button
            component="a"
            href={pdfUrl}
            target="_blank"
            variant="contained"
            startIcon={
              <Box component="span" aria-hidden="true">
                &#9654;
              </Box>
            }
          >
            View PDF
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
