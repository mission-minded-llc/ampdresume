import { ProjectAccordion } from "./ProjectAccordion";
import { ProjectItem } from "./ProjectItem";
import { ProjectWithSkills } from "@/graphql/getPositions";
import { ResumeContext } from "../ResumeContext";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { useContext } from "react";

/**
 * This is the primary Projects component, which renders as list of all projects.
 * These can be contained in an Accordion component, or as a standalone list item.
 */
export const Projects = ({ projects }: { projects: ProjectWithSkills[] }) => {
  const { skillsForUser } = useContext(ResumeContext);

  return projects.map((project) => {
    const projectSkills = project?.skillsForProject?.length
      ? skillsForUser.reduce<SkillForUserWithSkill[]>((acc, skillForUser) => {
          const skillForUserClone = { ...skillForUser }; // Ensure we're not affecting the original properties.

          const skillIsInProject = project.skillsForProject
            .map((skillForProject) => skillForProject.skillForUser.id)
            .includes(skillForUserClone.id);

          if (!skillIsInProject) return acc;

          // It's linked! Ensure we include the project-specific description.
          const matchedSkill = project.skillsForProject.find(
            (s) => s.skillForUser.id === skillForUserClone.id,
          );
          if (matchedSkill && matchedSkill?.description) {
            skillForUserClone.description = matchedSkill.description;
          }

          acc.push(skillForUserClone);

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
