import React from "react";
import { Typography, Link } from "@mui/material";
import { FeaturedProject } from "@/types";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { Section, SectionTitle, fontSize } from "./styled";

export const FeaturedProjects = ({ featuredProjects }: { featuredProjects: FeaturedProject[] }) => {
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
          <React.Fragment key={safeProject.id}>
            <Typography sx={{ fontSize: 14, fontWeight: "bold", mt: 1 }}>
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
                          color: "maroon",
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
              <Typography sx={{ fontSize: 12, mt: 0.5 }}>
                {safeProject.links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#000", mr: 1 }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Typography>
            )}
          </React.Fragment>
        );
      })}
    </Section>
  );
};
