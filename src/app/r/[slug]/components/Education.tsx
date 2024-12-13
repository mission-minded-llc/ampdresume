"use client";

import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";

import type { Education as EducationType } from "@prisma/client";
import { ResumeContext } from "./ResumeContext";
import { formatDate } from "@/lib/format";

export const Education = () => {
  const { education } = useContext(ResumeContext);

  // Group education by school name. This was a simpler
  // approach than to create a separate type speficially to group
  // by school in Sanity.
  const educationGroupedBySchool: { [key: string]: EducationType[] } = {};
  education.map((edu) => {
    if (!edu?.school) return;

    educationGroupedBySchool[edu.school] = educationGroupedBySchool[edu.school]
      ? [...educationGroupedBySchool[edu.school], edu]
      : [edu];
  });

  return (
    <Box
      component="section"
      sx={{
        marginTop: "30px",
        "@media screen and (max-width: 600px)": {
          marginTop: "16px",
          paddingTop: 0,
        },
      }}
    >
      {Object.keys(educationGroupedBySchool).map((school) => (
        <React.Fragment key={`education-${school}`}>
          <Typography component="h3" variant="h5">
            {school}
          </Typography>
          {educationGroupedBySchool[school].map((edu) => (
            <Typography
              component="h4"
              variant="h6"
              key={`education-${edu.id}`}
              sx={{ fontWeight: "bold", mt: 1 }}
            >
              {edu.degree}
              <Typography component="span" variant="h6" sx={{ fontWeight: "normal" }}>
                {" "}
                &mdash; {formatDate(edu?.dateAwarded?.toString())}
              </Typography>
            </Typography>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};
