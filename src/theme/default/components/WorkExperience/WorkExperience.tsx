"use client";

import parse from "html-react-parser";
import { Box, Typography } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { ResumeTitle } from "@/theme/components/ResumeTitle/ResumeTitle";
import { Company } from "@/types";
import { PositionsList } from "./PositionsList";
import { secureHtmlParserOptions } from "@/lib/secureHtmlParser";

export const WorkExperience = ({ companies }: { companies: Company[] }) => (
  <Box component="section">
    <ResumeTitle>Work Experience</ResumeTitle>
    {companies.map((company) => {
      const startDate = formatLongDate(company?.startDate?.toString());
      const endDate = formatLongDate(company?.endDate?.toString());

      return (
        <Box
          key={`company-${company.id}`}
          sx={(theme) => ({
            mt: 0,
            [theme.breakpoints.down("sm")]: {
              pt: 0,
            },
          })}
        >
          <Typography
            component="h3"
            variant="h5"
            sx={(theme) => ({
              textAlign: "center",
              padding: "20px 0 0",
              zIndex: 1,
              lineHeight: "2rem",
              fontWeight: "bold",
              [theme.breakpoints.down("sm")]: {
                mt: 0,
                textAlign: "left",
                fontSize: "1.5rem",
              },
            })}
          >
            {company.name}
            <Typography
              component="div"
              sx={{
                fontWeight: "normal",
                fontSize: "1.2rem",
                mt: 1,
              }}
            >
              {company?.location ? `${company.location}, ` : ""}
              {startDate} to {endDate.length ? endDate : "Present"}
            </Typography>
            {company?.description && (
              <Typography
                component="div"
                sx={{
                  fontSize: "1rem",
                  maxWidth: "600px",
                  margin: "1rem auto",
                  fontStyle: "italic",
                }}
              >
                {parse(company.description, secureHtmlParserOptions)}
              </Typography>
            )}
          </Typography>
          <PositionsList company={company} />
        </Box>
      );
    })}
  </Box>
);
