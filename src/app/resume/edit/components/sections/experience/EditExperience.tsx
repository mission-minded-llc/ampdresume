"use client";

import { Box, Button, Container } from "@mui/material";

import { ResumeContext } from "@/components/resume/ResumeContext";
import { SectionTitle } from "../SectionTitle";
import { WorkExperience } from "@/components/resume/WorkExperience/WorkExperience";
import { useContext } from "react";

export const EditExperience = () => {
  const { companies } = useContext(ResumeContext);

  const handleAddCompany = () => {};

  return (
    <Container>
      <SectionTitle title="Edit Professional Experience" />
      {companies.map((company) => (
        <div key={company.id}>{company.name}</div>
      ))}
      <Box sx={{ mb: 4 }}>
        <Button variant="outlined" color="primary" onClick={handleAddCompany}>
          Add Company
        </Button>
      </Box>
      <SectionTitle title="Your Work Experience" />
      <WorkExperience />
    </Container>
  );
};
