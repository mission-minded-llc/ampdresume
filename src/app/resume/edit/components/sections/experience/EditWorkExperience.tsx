import { Container } from "@mui/material";
import { SectionTitle } from "../SectionTitle";
import { WorkExperience } from "@/components/resume/WorkExperience/WorkExperience";

export const EditWorkExperience = () => (
  <Container>
    <SectionTitle title="Your Professional Experience" />
    <WorkExperience />
  </Container>
);
