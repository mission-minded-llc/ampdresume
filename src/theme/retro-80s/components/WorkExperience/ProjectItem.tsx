import { Box } from "@mui/material";
import { SkillItem } from "@/theme/components/Skills/SkillItem";
import { SkillsContextProvider } from "@/theme/components/Skills/Skills";
import { Project } from "@/types";
import { getRetroPalette, MONO_FONT, pixelChipSkin } from "../../styles";

/**
 * The project row: a chevron-marked line item plus its skill tags. Used on its own
 * and as the summary row of an expandable project.
 */
export const ProjectItem = ({ project }: { project: Project }) => (
  <Box
    sx={(theme) => {
      const retro = getRetroPalette(theme.palette.mode);

      return {
        position: "relative",
        width: "100%",
        textAlign: "left",
        display: "grid",
        gridTemplateColumns: project?.skillsForProject?.length > 0 ? "60% 1fr" : "1fr",
        alignItems: "center",
        gap: 3,
        padding: "12px 8px",
        fontFamily: MONO_FONT,
        fontSize: "0.95rem",
        borderBottom: `1px dotted ${retro.dim}`,
        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "1fr",
          gap: "10px",
          padding: "12px 0",
        },
      };
    }}
  >
    <Box
      sx={(theme) => ({
        "&::before": {
          content: '"\\25B8 "',
          color: getRetroPalette(theme.palette.mode).accentAlt,
        },
      })}
    >
      {project.name}
    </Box>
    {project?.skillsForProject?.length > 0 ? (
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "6px",
          ...pixelChipSkin(getRetroPalette(theme.palette.mode)),
        })}
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
