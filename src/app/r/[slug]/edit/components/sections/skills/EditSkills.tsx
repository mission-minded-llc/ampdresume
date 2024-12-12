"use client";

import { Box, Container, Divider, Typography } from "@mui/material";
import { SkillSearch } from "./SkillSearch";
import { Skills } from "@/app/r/[slug]/components/Skills/Skills";

export const EditSkills = () => {
  return (
    <Container>
      <Skills />
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add a skill
        </Typography>
        <Typography sx={{ mb: 2 }}>Search for a skill to add to your profile:</Typography>
        <SkillSearch />
      </Box>
    </Container>
  );
};
