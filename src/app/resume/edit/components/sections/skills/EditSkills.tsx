import { Container, IconButton, Tooltip, Typography } from "@mui/material";

import { InfoOutlined } from "@mui/icons-material";
import { SectionTitle } from "../SectionTitle";
import { SkillSearch } from "./SkillSearch";
import { Skills } from "@/components/resume/Skills/Skills";

export const EditSkills = () => (
  <Container>
    <SectionTitle title="Add a Skill" />

    <Typography sx={{ mb: 2 }}>Search for a skill to add to your profile:</Typography>
    <SkillSearch />

    <Typography variant="h5" sx={{ mb: 2, mt: 6 }}>
      Your Skills{" "}
      <Tooltip title="Click on a skill to edit or remove it.">
        <IconButton size="small" sx={{ ml: 1 }}>
          <InfoOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    </Typography>

    <Skills skillType="user" />
  </Container>
);
