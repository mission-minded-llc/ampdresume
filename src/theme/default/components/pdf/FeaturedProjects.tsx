import { Box, Typography, Link } from "@mui/material";
import { FeaturedProject } from "@/types";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { usePdfLayout } from "./pdfLayout";
import { Section, SectionTitle } from "./styled";

export const FeaturedProjects = ({ featuredProjects }: { featuredProjects: FeaturedProject[] }) => {
  const { fontSize, skillColor, ink } = usePdfLayout();
  if (!featuredProjects || featuredProjects.length === 0) return null;

  return (
    <Section>
      <SectionTitle>Featured Projects</SectionTitle>
      {featuredProjects.map((project) => {
        const skillsForFeaturedProject = Array.isArray(project.skillsForFeaturedProject)
          ? project.skillsForFeaturedProject
          : [];
        const safeProject = { ...project, skillsForFeaturedProject };

        return (
          <Box key={safeProject.id} data-pdf-unit="">
            <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold", mt: 1 }}>
              {safeProject.name}
              {safeProject.skillsForFeaturedProject.length > 0 && (
                <>
                  {" "}
                  {safeProject.skillsForFeaturedProject.map(
                    (skillForFeaturedProject, skillIndex) => (
                      <Typography
                        key={skillForFeaturedProject.id}
                        component="span"
                        sx={{
                          fontSize: fontSize.body,
                          color: skillColor,
                        }}
                      >
                        {skillForFeaturedProject.skillForUser?.skill?.name}
                        {skillIndex < safeProject.skillsForFeaturedProject.length - 1 ? ", " : ""}
                      </Typography>
                    ),
                  )}
                </>
              )}
            </Typography>
            <Typography component="div" sx={{ fontSize: fontSize.body }}>
              <RichTextBlock content={safeProject?.description} />
            </Typography>
            {safeProject.links && safeProject.links.length > 0 && (
              <Typography sx={{ fontSize: fontSize.body, mt: 0.5 }}>
                {safeProject.links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: ink, mr: 1 }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Typography>
            )}
          </Box>
        );
      })}
    </Section>
  );
};
