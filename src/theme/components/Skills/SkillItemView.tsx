import "./SkillItemView.css";
import { Box } from "@mui/material";
import { hasRichTextContent } from "@/lib/richText";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { SkillForUser } from "@/types";

export const SkillItemView = ({ skill }: { skill: SkillForUser }) => {
  if (!hasRichTextContent(skill?.description)) return null;

  return (
    <Box className="skillDescription">
      <RichTextBlock content={skill.description} />
    </Box>
  );
};
