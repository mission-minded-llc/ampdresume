import { Box } from "@mui/material";
import { ProjectWithSkills } from "@/graphql/getPositions";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillItem } from "../Skills/SkillItem";
import { SkillsContextProvider } from "../Skills/Skills";

/**
 * This contains the top-level project description and skill tags. It can
 * be used as standalone, or within the Accordion.
 */
export const ProjectItem = ({
  project,
  projectSkills,
}: {
  project: ProjectWithSkills;
  projectSkills: SkillForUserWithSkill[];
}) => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      textAlign: "left",
      display: "grid",
      gridTemplateColumns: projectSkills?.length > 0 ? "60% 1fr" : "1fr",
      alignItems: "center",
      gap: "20px",
      padding: "10px 40px 10px 20px",
      "@media screen and (max-width: 600px)": {
        gridTemplateColumns: "1fr",
        gap: "10px",
        padding: "10px",
      },
    }}
  >
    <Box>{project.name}</Box>
    {projectSkills?.length > 0 ? (
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
          {projectSkills.map((skill) => (
            <SkillItem key={`skill-${skill.skill.name}`} skill={skill} />
          ))}
        </SkillsContextProvider>
      </Box>
    ) : null}
  </Box>
);
