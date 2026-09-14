import { Skill } from "@/types";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import React, { useCallback, useMemo } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Chip, Typography } from "@mui/material";

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
      setSkills((current) => current.filter((skill) => skill.id !== skillId));
    },
    [setSkills],
  );

  const sortedSkills = useMemo(
    () =>
      [...skills].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" })),
    [skills],
  );

  if (!session) {
    return <Typography>Please sign in to continue</Typography>;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
      >
        Skills{skills.length ? ` (${skills.length})` : ""}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Skills matched from your resume, sorted A–Z. Click the × on a skill to remove it. You can
        add more after saving.
      </Typography>
      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          borderRadius: 2,
        }}
      >
        {sortedSkills.length === 0 ? (
          <Typography>No skills found.</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
            }}
          >
            {sortedSkills.map((skill) => (
              <Chip
                key={skill.id}
                data-testid={`skill-chip-${skill.id}`}
                label={skill.name}
                variant="outlined"
                color="primary"
                onDelete={() => handleDelete(skill.id)}
                deleteIcon={
                  <CancelIcon
                    data-testid={`trash-icon-${skill.id}`}
                    aria-label={`Remove ${skill.name}`}
                  />
                }
                icon={
                  skill.icon ? (
                    <Box component="span" sx={{ display: "inline-flex !important", ml: 0.5 }}>
                      <Icon icon={skill.icon} width={16} height={16} />
                    </Box>
                  ) : undefined
                }
                sx={(theme) => ({
                  maxWidth: "100%",
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.main,
                  borderColor: "transparent",
                  "& .MuiChip-label": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                  "& .MuiChip-deleteIcon": {
                    color: theme.palette.primary.main,
                    opacity: 0.55,
                    "&:hover": {
                      color: theme.palette.error.main,
                      opacity: 1,
                    },
                  },
                })}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const ExtractedSkills = React.memo(ExtractedSkillsComponent);
