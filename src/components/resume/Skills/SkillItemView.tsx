import { Box } from "@mui/material";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import parse from "html-react-parser";

export const SkillItemView = ({ skill }: { skill: SkillForUserWithSkill }) => {
  if (!skill?.description) return null;

  return <Box>{parse(skill.description)}</Box>;
};
