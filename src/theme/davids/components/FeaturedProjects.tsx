import { Box, useTheme } from "@mui/material";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { FeaturedProject } from "@/types";

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const theme = useTheme();

  return (
    <Box data-testid="featured-projects">
      {projects.map((proj) => {
        const skillsForFeaturedProject = Array.isArray(proj.skillsForFeaturedProject)
          ? proj.skillsForFeaturedProject
          : [];
        const safeProj = { ...proj, skillsForFeaturedProject };
        return (
          <Box
            key={safeProj.id}
            sx={{
              mb: 3,
              pl: 1.5,
              borderLeft: `3px solid ${theme.palette.mode === "dark" ? "#60a5fa" : "#0d47a1"}`,
            }}
          >
            <Box component="h3" sx={{ fontWeight: 750, mb: 0.5, letterSpacing: "-0.02em" }}>
              {safeProj.name}
            </Box>
            <RichTextBlock content={safeProj?.description} />
            {safeProj.links && safeProj.links.length > 0 && (
              <Box sx={{ mt: 0.5 }}>
                {safeProj.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginRight: 8,
                      color: theme.palette.primary.main,
                      textDecoration: "underline",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </Box>
            )}
            {safeProj.skillsForFeaturedProject.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {safeProj.skillsForFeaturedProject.map((skillForFeaturedProject) => (
                  <Box
                    key={skillForFeaturedProject.id}
                    sx={{
                      display: "inline-block",
                      background: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      borderRadius: 999,
                      px: 1,
                      py: 0.5,
                      fontSize: "0.9rem",
                      mr: 1,
                      mb: 1,
                    }}
                  >
                    {skillForFeaturedProject.skillForUser?.skill?.name}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
