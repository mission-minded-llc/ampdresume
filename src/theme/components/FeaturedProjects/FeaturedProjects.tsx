import { Box, Typography, Link } from "@mui/material";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { ResumeTitle } from "@/theme/components/ResumeTitle/ResumeTitle";
import type { FeaturedProject } from "@/types";

export const FeaturedProjects = ({ featuredProjects }: { featuredProjects: FeaturedProject[] }) => {
  if (!featuredProjects || featuredProjects.length === 0) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        marginTop: "30px",
        "@media screen and (max-width: 600px)": {
          marginTop: "16px",
          paddingTop: 0,
        },
      }}
    >
      <ResumeTitle>Featured Projects</ResumeTitle>
      {featuredProjects.map((project) => {
        const skillsForFeaturedProject = Array.isArray(project.skillsForFeaturedProject)
          ? project.skillsForFeaturedProject
          : [];
        const safeProject = { ...project, skillsForFeaturedProject };

        return (
          <Box key={safeProject.id} sx={{ mb: 3 }}>
            <Typography component="h3" variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
              {safeProject.name}
            </Typography>
            <RichTextBlock content={safeProject?.description} />
            {safeProject.links && safeProject.links.length > 0 && (
              <Box sx={{ mt: 0.5 }}>
                {safeProject.links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mr: 1 }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            )}
            {safeProject.skillsForFeaturedProject.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {safeProject.skillsForFeaturedProject.map((skillForFeaturedProject) => (
                  <Box
                    key={skillForFeaturedProject.id}
                    sx={{
                      display: "inline-block",
                      background: (theme) => theme.palette.primary.light,
                      color: (theme) => theme.palette.primary.main,
                      borderRadius: 2,
                      px: 1,
                      py: 0.5,
                      fontSize: "0.9rem",
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
