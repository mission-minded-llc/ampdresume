import { Box, IconButton, Typography } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Skill } from "@openresume/theme";
import { SkillItem } from "../skills/SkillItem";
import { useExtractedData } from "./ExtractedDataContext";
import { useSession } from "next-auth/react";

interface ExtractedSkillsProps {
  skills: Skill[];
}

export const ExtractedSkills = ({ skills }: ExtractedSkillsProps) => {
  const { updateSkills } = useExtractedData();
  const { data: session } = useSession();

  const handleDelete = (skillToDelete: string) => {
    const filteredMatches = skills?.filter((skill) => skill.name !== skillToDelete) || [];
    updateSkills(filteredMatches);
  };

  if (!session) {
    return <Typography>Please sign in to continue</Typography>;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Skills
      </Typography>
      <Box
        sx={{
          p: 2,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.default",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {skills?.map((skill, index) => {
          const skillId = `skill-${index}`;

          const skillForUser = {
            skill,
            id: skill.id,
            icon: null,
            userId: session.user.id,
          };

          return (
            <Box
              key={skillId}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                bgcolor: "background.paper",
              }}
            >
              <SkillItem skill={skillForUser} />
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(skill.name)}
                sx={{ p: 0.5 }}
                data-testid={`trash-icon-${skill.id}`}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
