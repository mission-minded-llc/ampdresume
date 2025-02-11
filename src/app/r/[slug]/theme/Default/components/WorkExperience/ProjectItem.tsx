import { Box } from "@mui/material";
import { ProjectWithSkills } from "@/graphql/getPositionsWithSkillsForProjects";
import { SkillItem } from "../Skills/SkillItem";
import { SkillsContextProvider } from "../Skills/Skills";

/**
 * This contains the top-level project description and skill tags. It can
 * be used as standalone, or within the Accordion.
 */
export const ProjectItem = ({ project }: { project: ProjectWithSkills }) => (
  <Box
    sx={(theme) => ({
      position: "relative",
      width: "100%",
      textAlign: "left",
      display: "grid",
      gridTemplateColumns: project?.skillsForProject?.length > 0 ? "60% 1fr" : "1fr",
      alignItems: "center",
      gap: 4,
      padding: 2,
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gap: "10px",
        padding: "10px 0",
        fontSize: "1rem",
      },
      borderBottom: "1px solid",
      borderBottomColor: theme.palette.divider,
    })}
  >
    <Box>{project.name}</Box>
    {project?.skillsForProject?.length > 0 ? (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "4px",
          "@media screen and (max-width: 600px)": {
            paddingBottom: "16px",
            borderBottom: "1px solid lightgray",
          },
        }}
      >
        <SkillsContextProvider skillType="project">
          {project.skillsForProject.map((skillForProject) => (
            <SkillItem
              key={`skill-${skillForProject.skillForUser.skill.name}`}
              skill={skillForProject}
            />
          ))}
        </SkillsContextProvider>
      </Box>
    ) : null}
  </Box>
);
