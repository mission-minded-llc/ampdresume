"use client";

import { usePathname } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { Social, User } from "@/types";
import {
  generateSocialUrl,
  getSocialIcon,
  getSocialMediaPlatformByPlatformName,
} from "@/util/social";

export const ResumeHeading = ({ user, socials }: { user: User; socials: Social[] }) => {
  const pathname = usePathname();
  const pdfUrl = `${pathname}/pdf`;

  return (
    <Typography
      component="h1"
      variant="h4"
      sx={(theme) => ({
        marginTop: 8,
        marginBottom: 0,
        textAlign: "center",
        lineHeight: 1.15,
        letterSpacing: "-0.03em",
        fontWeight: 750,
        [theme.breakpoints.down("sm")]: {
          textAlign: "left",
          fontSize: "2rem",
          marginTop: 0,
        },
      })}
    >
      {user?.name}
      <Typography
        component="span"
        variant="h5"
        sx={(theme) => ({
          display: "block",
          mt: 1.25,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "text.secondary",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
          },
        })}
      >
        {user?.title}
      </Typography>
      <Typography
        component="span"
        variant="body1"
        sx={{
          display: "block",
          mt: 1,
          fontSize: "1rem",
          color: "text.secondary",
          letterSpacing: 0,
          fontWeight: 400,
        }}
      >
        {user?.displayEmail}
        {user?.displayEmail && user?.location ? (
          <Typography
            component="span"
            sx={{
              margin: "0 0.65rem",
              fontSize: "1.1rem",
              fontWeight: 400,
              opacity: 0.55,
            }}
          >
            ·
          </Typography>
        ) : null}
        {user?.location}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2.5,
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          {socials
            ? socials.map((social) => {
                const platformName = getSocialMediaPlatformByPlatformName(social.platform).name;
                const ariaLabel = `${platformName} profile for ${user?.name || "user"}`;
                return (
                  <Box
                    key={social.id}
                    component="span"
                    sx={(theme) => ({
                      display: "inline-flex",
                      "& a": {
                        display: "inline-flex",
                        p: 0.75,
                        borderRadius: 2,
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(42,36,48,0.06)",
                        },
                      },
                    })}
                  >
                    <a href={generateSocialUrl(social)} target="_blank" aria-label={ariaLabel}>
                      <Icon icon={getSocialIcon(social)} width="28" height="28" />
                    </a>
                  </Box>
                );
              })
            : null}
        </Box>
        <Button
          component="a"
          href={pdfUrl}
          target="_blank"
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<Icon icon="catppuccin:pdf" width="20" height="20" />}
        >
          View PDF
        </Button>
      </Box>
    </Typography>
  );
};
