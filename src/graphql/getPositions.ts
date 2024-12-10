import { gql } from "@apollo/client";
import { Company, Position, Project, Skill, SkillForProject } from "@prisma/client";

export const GET_POSITIONS = gql`
  query getPositions($companyIds: [ID!]) {
    positions(companyIds: $companyIds, sort: [{ field: "endDate", direction: DESC }]) {
      id
      title
      startDate
      endDate
      company {
        id
        name
      }
      projects {
        id
        name
        description
        skillsForProject {
          skillForUser {
            id
          }
          description
        }
      }
    }
  }
`;

export interface SkillForProjectWithSkill extends SkillForProject {
  skillForUser: Skill;
}

export interface ProjectWithSkills extends Project {
  skillsForProject: SkillForProjectWithSkill[];
}

export interface PositionWithProjects extends Position {
  company: Company;
  projects: ProjectWithSkills[];
}
