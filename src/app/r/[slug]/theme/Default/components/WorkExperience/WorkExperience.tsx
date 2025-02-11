"use client";

import { Box, Typography } from "@mui/material";

import { Company } from "@/graphql/getCompanies";
import { PositionWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";
import { PositionsList } from "./PositionsList";
import { formatLongDate } from "@/lib/format";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export const WorkExperience = ({
  companies,
  positionsWithSkillsForProjects,
}: {
  companies: Company[];
  positionsWithSkillsForProjects: PositionWithSkillsForProjects[];
}) => {
  const isDesktop = useIsDesktop();

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
                component="span"
                variant="h5"
                sx={(theme) => ({
                  fontWeight: "normal",
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "1.2rem",
                  },
                })}
              >
                {isDesktop ? <> &mdash; </> : <br />}
                {startDate} to {endDate.length ? endDate : "Present"}
              </Typography>
            </Typography>
            <PositionsList positions={positionsInCompany} />
          </Box>
        );
      })}
    </Box>
  );
};
