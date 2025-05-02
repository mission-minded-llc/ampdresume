import { Box, TextField, Typography } from "@mui/material";

interface ExtractedSkillsProps {
  skills: string[];
}

export const ExtractedSkills = ({ skills }: ExtractedSkillsProps) => {
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
        {skills?.map((skill, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              p: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              bgcolor: "background.default",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <TextField fullWidth label="Skill Name" value={skill || ""} sx={{ mb: 1 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
