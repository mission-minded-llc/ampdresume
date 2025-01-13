import { Container, Typography } from "@mui/material";

import { CompanyList } from "./CompanyList";
import React from "react";
import { SectionTitle } from "../SectionTitle";

export const EditExperience = () => (
  <Container>
    <SectionTitle title="Edit Professional Experience" />
    <Typography variant="body1" sx={{ mb: 4 }}>
      Add your professional experience to your resume. You can add multiple companies and positions.
      To begin, add a company. Positions can be added within a company, and from there you can add
      projects (e.g. bullet points) to positions.
    </Typography>

    <CompanyList />
  </Container>
);
