import { Box, IconButton, Typography } from "@mui/material";

import { Icon } from "@iconify/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { SkillItem } from "../skills/SkillItem";
import { getSkillsFuzzyMatch } from "@/graphql/getSkillsFuzzyMatch";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface ExtractedSkillsProps {
  skills: string[];
}

export const ExtractedSkills = ({ skills }: ExtractedSkillsProps) => {
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Skills
      </Typography>
      <Box
        sx={{
          p: 2,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
      >
        {fuzzyMatches?.map((skill, index) => {
          const skillForUser = {
            skill,
            id: skill.id,
            icon: null,
            userId: session.user.id,
          };

          return (
            <Box key={index} display="flex" flexDirection="row" gap={1}>
              <Box sx={{ display: "block", border: 1, borderColor: "divider", borderRadius: 1 }}>
                <SkillItem key={index} skill={skillForUser} />
                <IconButton>
                  <Icon icon="mdi:delete" />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
