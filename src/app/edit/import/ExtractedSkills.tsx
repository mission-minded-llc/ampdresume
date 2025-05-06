import { Box, Chip, Typography } from "@mui/material";

import { LoadingOverlay } from "@/components/LoadingOverlay";
import { SkillItem } from "../skills/SkillItem";
import { getSkillsFuzzyMatch } from "@/graphql/getSkillsFuzzyMatch";
import { useExtractedData } from "./ExtractedDataContext";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface ExtractedSkillsProps {
  skills: string[];
}

export const ExtractedSkills = ({ skills }: ExtractedSkillsProps) => {
  const { updateSkills } = useExtractedData();
  const { data: session } = useSession();

  // Take the list of extracted skills text, and request fuzzy matches from the API.
  const {
    isPending,
    isError,
    data: fuzzyMatches,
  } = useQuery({
    queryKey: ["skillsFuzzyMatch", skills],
    queryFn: () => getSkillsFuzzyMatch(skills),
  });

  const handleDelete = (skillToDelete: string) => {
    updateSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  if (isPending) {
    return <LoadingOverlay message="Matching extracted skills..." />;
  }

  if (isError) {
    return <Typography>Error loading skills</Typography>;
  }

  if (!session) {
    return <Typography>Please sign in to continue</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Skills
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => handleDelete(skill)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
      <Box
        sx={{
          p: 2,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {fuzzyMatches?.map((skill, index) => {
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
              }}
            >
              <SkillItem skill={skillForUser} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
