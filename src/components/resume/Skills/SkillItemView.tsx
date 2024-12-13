import { Box } from "@mui/material";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";

export const SkillItemView = ({ skill }: { skill: SkillForUserWithSkill }) => (
  <Box>{skill.description}</Box>
);
