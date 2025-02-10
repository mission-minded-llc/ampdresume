import "./SkillItemView.css";

import { Box } from "@mui/material";
import { RichTextBlock } from "../RichTextBlock";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";

export const SkillItemView = ({ skill }: { skill: SkillForUserWithSkill }) => {
  if (!skill?.description) return null;

  return (
    <Box className="skillDescription">
      <RichTextBlock content={skill.description} />
    </Box>
  );
};
