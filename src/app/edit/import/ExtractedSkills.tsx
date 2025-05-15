import { Box, IconButton, Typography } from "@mui/material";
import React, { useCallback } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Skill } from "@openresume/theme";
import { SkillItem } from "../skills/SkillItem";
import { useSession } from "next-auth/react";

/**
 * The component for the extracted skills page.
 *
 * @param skills - The skills to display.
 * @param setSkills - The function to set the skills.
 * @returns The extracted skills page.
 */
const ExtractedSkillsComponent = ({
  skills,
  setSkills,
}: {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}) => {
  const { data: session } = useSession();
  const handleDelete = useCallback(
    (skillId: string) => {
      const updatedSkills = skills.filter((skill) => skill.id !== skillId);
      setSkills(updatedSkills);
    },
    [skills, setSkills],
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
                  data-testid={`trash-icon-${skill.id}`}
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
