import { Box, IconButton, Typography } from "@mui/material";
import React, { useCallback } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Skill } from "@openresume/theme";
import { SkillItem } from "../skills/SkillItem";
import { useSession } from "next-auth/react";

interface ExtractedSkillsProps {
  skills: Skill[];
  updateSkills: (skills: Skill[]) => void;
}

const ExtractedSkillsComponent = ({ skills, updateSkills }: ExtractedSkillsProps) => {
  const { data: session } = useSession();
  const handleDelete = useCallback(
    (skillId: string) => {
      const updatedSkills = skills.filter((skill) => skill.id !== skillId);
      updateSkills(updatedSkills);
    },
    [skills, updateSkills],
  );

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
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "background.default",
          p: 2,
          borderRadius: 2,
        }}
      >
        {skills.length === 0 ? (
          <Typography>No skills found.</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {skills.map((skill) => (
              <Box
                key={skill.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <SkillItem
                  skill={{
                    skill,
                    id: skill.id,
                    userId: session.user.id,
                    icon: null,
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleDelete(skill.id)}
                  sx={{
                    p: 0.5,
                    "&:hover": {
                      color: "error.main",
                    },
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const ExtractedSkills = React.memo(ExtractedSkillsComponent);
