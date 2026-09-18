"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { formatLongDate } from "@/lib/format";
import { Company, Position } from "@/types";
import { getRetroPalette, MONO_FONT, PIXEL_FONT } from "../../styles";
import { Projects } from "./Projects";

/**
 * A position is a HUD bar that sticks to the top of the viewport on desktop while its
 * projects scroll past, revealing the company name once it latches, same as Classic.
 */
export const PositionSingle = ({
  position,
  company,
  showDates,
}: {
  position: Position;
  company: Company;
  showDates: boolean;
}) => {
  const isDesktop = useIsDesktop();

  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLHeadingElement | null>(null);

  const handleScroll = () => {
    if (!stickyRef.current) return;

    const { top } = stickyRef.current.getBoundingClientRect();
    setIsSticky(top <= 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const startDate = formatLongDate(position?.startDate?.toString());
  const endDate = formatLongDate(position?.endDate?.toString());

  return (
    <Box sx={{ pb: 2 }}>
      <Typography
        component="h4"
        ref={stickyRef}
        sx={(theme) => {
          const retro = getRetroPalette(theme.palette.mode);

          return {
            position: isDesktop ? "sticky" : "static",
            top: 0,
            zIndex: 2,
            px: 2,
            py: 1.5,
            mb: 1,
            fontFamily: PIXEL_FONT,
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: 1.8,
            color: retro.ink,
            backgroundColor: retro.surfaceAlt,
            border: "none",
            borderBottom: `2px solid ${isSticky ? retro.accentAlt : retro.border}`,
            "&::before": {
              content: '"\\25B6  "',
              color: retro.highlight,
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.7rem",
              px: 1.5,
            },
          };
        }}
      >
        {position.title}
        {showDates ? (
          <Typography
            component="span"
            sx={(theme) => ({
              display: "block",
              mt: 1,
              fontFamily: MONO_FONT,
              fontSize: "0.85rem",
              color: getRetroPalette(theme.palette.mode).inkMuted,
            })}
          >
            {startDate} to {endDate.length ? endDate : "Present"}
          </Typography>
        ) : null}
        <Typography
          component="span"
          sx={(theme) => ({
            display: isSticky ? "block" : "none",
            mt: 1,
            fontFamily: MONO_FONT,
            fontSize: "0.85rem",
            color: getRetroPalette(theme.palette.mode).accentAlt,
            [theme.breakpoints.down("sm")]: {
              display: "block",
            },
          })}
        >
          {company.name}
        </Typography>
      </Typography>
      <Box sx={{ px: 2 }}>
        {position?.projects ? <Projects projects={position.projects} /> : null}
      </Box>
    </Box>
  );
};
