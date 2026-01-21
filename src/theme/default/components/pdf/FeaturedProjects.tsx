import React from "react";
import { Typography, Link } from "@mui/material";
import { FeaturedProject } from "@/types";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { Section, SectionTitle } from "./styled";

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
            </Typography>
            <RichTextBlock content={safeProject?.description} />
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
            {safeProject.skillsForFeaturedProject.length > 0 && (
              <Typography sx={{ fontSize: 12, mt: 0.5 }}>
                {safeProject.skillsForFeaturedProject.map((skillForFeaturedProject, idx) => (
                  <React.Fragment key={skillForFeaturedProject.id}>
                    {idx > 0 && ", "}
                    {skillForFeaturedProject.skillForUser?.skill?.name}
                  </React.Fragment>
                ))}
              </Typography>
            )}
          </React.Fragment>
        );
      })}
    </Section>
  );
};
