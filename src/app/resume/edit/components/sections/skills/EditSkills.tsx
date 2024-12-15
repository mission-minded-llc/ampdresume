"use client";

import { Box, Container, Divider, IconButton, Tooltip, Typography } from "@mui/material";

import { InfoOutlined } from "@mui/icons-material";
import { SkillSearch } from "./SkillSearch";
import { Skills } from "@/components/resume/Skills/Skills";

export const EditSkills = () => {
  return (
    <Container>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add a skill
        </Typography>
        <Typography sx={{ mb: 2 }}>Search for a skill to add to your profile:</Typography>
        <SkillSearch />
      </Box>
      <Divider sx={{ mb: 6, mt: 4 }} />
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your skills{" "}
        <Tooltip title="Click on a skill to edit or remove it.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      <Skills skillType="user" />
    </Container>
  );
};
