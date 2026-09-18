"use client";

import parse from "html-react-parser";
import { Box, Typography } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { secureHtmlParserOptions } from "@/lib/secureHtmlParser";
import { Company } from "@/types";
import { getRetroPalette, MONO_FONT, PIXEL_FONT, pixelLabel, pixelShadow } from "../../styles";
import { PixelSectionTitle } from "../PixelSection";
import { PositionsList } from "./PositionsList";

/**
 * Each company is a "stage" in the cabinet: a bordered panel with a numbered HUD bar,
 * and the company blurb in a dialog box.
 */
export const WorkExperience = ({ companies }: { companies: Company[] }) => (
  <Box component="section">
    <PixelSectionTitle>Work Experience</PixelSectionTitle>
    {companies.map((company, index) => {
      const startDate = formatLongDate(company?.startDate?.toString());
      const endDate = formatLongDate(company?.endDate?.toString());
      const stage = String(index + 1).padStart(2, "0");

      return (
        <Box
          key={`company-${company.id}`}
          sx={(theme) => {
            const retro = getRetroPalette(theme.palette.mode);

            return {
              mt: 4,
              backgroundColor: retro.panel,
              border: `2px solid ${retro.border}`,
              boxShadow: pixelShadow(retro),
            };
          }}
        >
          <Box
            sx={(theme) => {
              const retro = getRetroPalette(theme.palette.mode);

              return {
                p: 2,
                backgroundColor: retro.surfaceAlt,
                borderBottom: `2px solid ${retro.border}`,
              };
            }}
          >
            <Box
              component="span"
              sx={(theme) => ({
                ...pixelLabel(getRetroPalette(theme.palette.mode).highlight),
                display: "block",
                mb: 1,
              })}
            >
              Stage {stage}
            </Box>
            <Typography
              component="h3"
              sx={(theme) => {
                const retro = getRetroPalette(theme.palette.mode);

                return {
                  fontFamily: PIXEL_FONT,
                  fontSize: "1rem",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: retro.ink,
                  textShadow: `2px 2px 0 ${retro.ghost}`,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                  },
                };
              }}
            >
              {company.name}
            </Typography>
            <Typography
              component="div"
              sx={(theme) => ({
                mt: 1.5,
                fontFamily: MONO_FONT,
                fontSize: "0.95rem",
                color: getRetroPalette(theme.palette.mode).inkMuted,
              })}
            >
              {company?.location ? `${company.location}, ` : ""}
              {startDate} to {endDate.length ? endDate : "Present"}
            </Typography>
          </Box>

          {company?.description ? (
            <Typography
              component="div"
              sx={(theme) => {
                const retro = getRetroPalette(theme.palette.mode);

                return {
                  m: 2,
                  p: 2,
                  fontFamily: MONO_FONT,
                  fontSize: "0.95rem",
                  border: `1px dashed ${retro.dim}`,
                  color: retro.inkMuted,
                };
              }}
            >
              {parse(company.description, secureHtmlParserOptions)}
            </Typography>
          ) : null}

          <PositionsList company={company} />
        </Box>
      );
    })}
  </Box>
);
