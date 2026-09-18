import { Project } from "@/types";
import { ProjectAccordion } from "./ProjectAccordion";
import { ProjectItem } from "./ProjectItem";

/**
 * Renders the list of projects for a position. Projects with a block description are
 * expandable; the rest are single rows.
 */
export const Projects = ({ projects }: { projects: Project[] }) =>
  projects.map((project) => {
    if (project?.description)
      return <ProjectAccordion key={`project-${project.id}`} project={project} />;

    return <ProjectItem key={`project-${project.id}`} project={project} />;
  });
