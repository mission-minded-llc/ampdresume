import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";

import { DataContext } from "@/context/DataContext";
import { SkillItem } from "@/components/sections/Skills/SkillItem";
import styles from "./Projects.module.scss";
import { ProjectWithSkills } from "@/graphql/getPositions";
import { SkillForUserWithSkill } from "@/graphql/getSkills";

/**
 * This contains the top-level project description and skill tags. It can
 * be used as standalone, or within the Accordion.
 */
const ProjectItem = ({
  project,
  projectSkills,
}: {
  project: ProjectWithSkills;
  projectSkills: SkillForUserWithSkill[];
}) => (
  <div className={styles.projectOverview}>
    <div>{project.name}</div>
    <div className={styles.projectTagContainer}>
      {projectSkills.map((skill) => (
        <SkillItem key={`skill-${skill.skill.name}`} skill={skill} />
      ))}
    </div>
  </div>
);

const ProjectAccordion = ({
  project,
  projectSkills,
}: {
  project: ProjectWithSkills;
  projectSkills: SkillForUserWithSkill[];
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (event: SyntheticEvent, isExpanded: boolean) => {
    const target = event.target as HTMLElement;
    const isButtonClick = target.closest(".MuiButton-root");
    const isDialogClick = target.closest(".MuiDialog-root");

    if (isButtonClick || isDialogClick) {
      setExpanded(true); // Ensure the accordion remains open.
      return;
    }

    setExpanded(isExpanded);
  };

  return (
    <Accordion
      sx={{
        boxShadow: "none",
        padding: "0",
        backgroundColor: "transparent",
      }}
      slotProps={{ heading: { component: "h5" } }}
      className={styles.accordion}
      onChange={handleAccordionChange}
      expanded={expanded}
    >
      <AccordionSummary expandIcon={<span className={styles.expandIcon}>&lt;</span>}>
        <ProjectItem project={project} projectSkills={projectSkills} />
      </AccordionSummary>
      <AccordionDetails
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.light,
          padding: "2rem",
        })}
        className={styles.accordionDetails}
      >
        {project.description}
      </AccordionDetails>
    </Accordion>
  );
};

/**
 * This is the primary Projects component, which renders as list of all projects.
 * These can be contained in an Accordion component, or as a standalone list item.
 */
export const Projects = ({ projects }: { projects: ProjectWithSkills[] }) => {
  const { skills } = useContext(DataContext);

  return projects.map((project) => {
    const projectSkills = project?.skillsForProject?.length
      ? skills.reduce<SkillForUserWithSkill[]>((acc, skill) => {
          const skillClone = { ...skill }; // Ensure we're not affecting the original properties.

          const skillIsInProject = project.skillsForProject
            .map((skillForProject) => skillForProject.skillForUser.id)
            .includes(skillClone.id);

          if (!skillIsInProject) return acc;

          // It's linked! Ensure we include the project-specific description.
          const matchedSkill = project.skillsForProject.find(
            (s) => s.skillForUser.id === skillClone.id,
          );
          if (matchedSkill && matchedSkill?.description) {
            skillClone.description = matchedSkill.description;
          }

          acc.push(skillClone);

          return acc;
        }, [])
      : [];

    // If the project contains a block description, we'll
    // use an Accordion component to render it.
    if (project?.description)
      return (
        <ProjectAccordion
          key={`project-${project.id}`}
          project={project}
          projectSkills={projectSkills}
        />
      );

    // Otherwise, show the project overview and skills only.
    return (
      <ProjectItem key={`project-${project.id}`} project={project} projectSkills={projectSkills} />
    );
  });
};
