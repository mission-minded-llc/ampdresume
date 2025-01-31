"use client";

import { Box, Typography } from "@mui/material";

import { PositionsList } from "./PositionsList";
import { ResumeContext } from "../ResumeContext";
import { formatLongDate } from "@/lib/format";
import { useContext } from "react";

export const WorkExperience = () => {
  const { companies, positionsWithSkillsForProjects } = useContext(ResumeContext);

  return (
    <Box component="section">
      {companies.map((company) => {
        const positionsInCompany = positionsWithSkillsForProjects.filter(
          (position) => position.company.id === company.id,
        );

        const startDate = formatLongDate(company?.startDate?.toString());
        const endDate = formatLongDate(company?.endDate?.toString());

        return (
          <Box
            key={`company-${company.id}`}
            sx={{
              marginTop: "30px",
              "@media screen and (max-width: 600px)": {
                marginTop: "16px",
                paddingTop: 0,
              },
            }}
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
                  textAlign: "left",
                },
              })}
            >
              {company.name}
              <Typography component="span" variant="h5" sx={{ fontWeight: "normal" }}>
                {" "}
                &mdash; {startDate} to {endDate.length ? endDate : "Present"}
              </Typography>
            </Typography>
            <PositionsList positions={positionsInCompany} />
          </Box>
        );
      })}
    </Box>
  );
};
