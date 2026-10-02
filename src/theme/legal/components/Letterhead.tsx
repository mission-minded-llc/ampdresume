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
import { letterheadContact } from "../letterheadContact";
import { getLegalPalette } from "../styles";
import { OxfordRule } from "./OxfordRule";

/**
 * Centered letterhead: a section mark, the name in small caps, and contact facts
 * closed by an oxford rule.
 *
 * @param user Profile shown in the letterhead.
 * @param socials Profile links rendered beside the PDF action.
 * @returns The chambers header.
 */
export const Letterhead = ({ user, socials }: { user: User; socials: Social[] }) => {
  const pathname = usePathname();
  const pdfUrl = `${pathname}/pdf`;
  const contact = letterheadContact(user);

  return (
    <Box component="header" sx={{ pt: { xs: 3, sm: 6 }, mb: 1 }}>
      <Box sx={{ textAlign: "center" }}>
        <Box
          aria-hidden="true"
          sx={(theme) => ({
            color: getLegalPalette(theme.palette.mode).seal,
            fontSize: "1.35rem",
            lineHeight: 1,
          })}
        >
          §
        </Box>
        <Typography
          component="div"
          sx={(theme) => ({
            mt: 1,
            mb: 0,
            fontSize: "0.72rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: getLegalPalette(theme.palette.mode).inkMuted,
          })}
        >
          Curriculum Vitae
        </Typography>
        <Typography
          component="h1"
          sx={{
            mt: 1,
            mb: 0,
            fontWeight: 600,
            fontSize: { xs: "1.85rem", sm: "2.35rem" },
            letterSpacing: "0.12em",
            lineHeight: 1.15,
            textTransform: "uppercase",
          }}
        >
          {user.name}
        </Typography>
        {user.title ? (
          <Typography
            component="div"
            sx={(theme) => ({
              mt: 1,
              mb: 0,
              fontSize: "1.05rem",
              fontStyle: "italic",
              color: getLegalPalette(theme.palette.mode).inkMuted,
            })}
          >
            {user.title}
          </Typography>
        ) : null}
        {contact.length > 0 ? (
          <Typography component="div" sx={{ mt: 0.75, mb: 0, fontSize: "0.95rem" }}>
            {contact.map((part, index) => (
              <span key={index}>
                {index > 0 ? (
                  <Box component="span" sx={{ px: "0.45em" }}>
                    {"\u00b7"}
                  </Box>
                ) : null}
                {part}
              </span>
            ))}
          </Typography>
        ) : null}
        <OxfordRule />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mt: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
          {socials.map((social) => {
            const platformName = getSocialMediaPlatformByPlatformName(social.platform).name;
            const ariaLabel = `${platformName} profile for ${user.name || "user"}`;

            return (
              <Box
                key={social.id}
                component="span"
                sx={(theme) => {
                  const legal = getLegalPalette(theme.palette.mode);

                  return {
                    display: "inline-flex",
                    "& a": {
                      display: "inline-flex",
                      p: 0.5,
                      color: legal.ink,
                      textDecoration: "none",
                      "&:hover": {
                        color: legal.seal,
                      },
                    },
                  };
                }}
              >
                <a href={generateSocialUrl(social)} target="_blank" aria-label={ariaLabel}>
                  <Icon icon={getSocialIcon(social)} width="22" height="22" />
                </a>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
          {shouldShowDemoResumeTag(user, pathname) ? <DemoResumeChip /> : null}
          <Button component="a" href={pdfUrl} target="_blank" variant="outlined" size="small">
            View PDF
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
