import { Box } from "@mui/material";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import parse from "html-react-parser";

export const SkillItemView = ({ skill }: { skill: SkillForUserWithSkill }) => {
  if (!skill?.description) return null;

  let nodes;
  try {
    nodes = parse(skill.description);
  } catch {
    // TODO: Handle errors with Sentry.
    return null;
  }

  return (
    <Box
      sx={{
        minWidth: "400px",
        maxWidth: "100%",
      }}
    >
      {nodes}
    </Box>
  );
};
