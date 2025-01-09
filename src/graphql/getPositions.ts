import { Company, Position, Project, Skill, SkillForProject } from "@prisma/client";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

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

export const getPositions = async (companyIds: string[]) => {
  const client = getApolloClient();

  const { data } = await client.query<{ positions: PositionWithProjects[] }>({
    query: gql`
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
    `,
    variables: {
      companyIds,
    },
  });

  return data.positions;
};
