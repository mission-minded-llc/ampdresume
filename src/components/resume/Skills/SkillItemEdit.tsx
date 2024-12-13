import { Box } from "@mui/material";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";

export const SkillItemEdit = ({ skill }: { skill: SkillForUserWithSkill }) => (
  <Box>{skill.description}</Box>
);
