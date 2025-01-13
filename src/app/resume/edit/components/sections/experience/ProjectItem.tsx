import { Project } from "@prisma/client";

export const ProjectItem = ({ project }: { project: Project }) => {
  return <>{project.name}</>;
};
