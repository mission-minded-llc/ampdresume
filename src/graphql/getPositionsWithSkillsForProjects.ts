import * as Sentry from "@sentry/react";

import { Company, Project } from "@prisma/client";

import { Position } from "./getPositionsWithProjects";
import { SkillForProjectWithSkill } from "./getSkillsForProject";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export interface ProjectWithSkills extends Project {
  skillsForProject: SkillForProjectWithSkill[];
}

export interface PositionWithProjectsWithSkills extends Position {
  company: Company;
  projects: ProjectWithSkills[];
}

/**
 * Used to fetch all positions for a specific company.
 *
 * @param {string[]} companyIds - the company IDs to fetch positions for.
 * @returns {PositionWithSkillsForProjects[]} all positions for the company, including projects for each position.
 */
export const getPositionsWithSkillsForProjects = async (
  companyIds: string[],
): Promise<PositionWithProjectsWithSkills[]> => {
  const client = getApolloClient();

  const { data } = await client
    .query<{ positions: PositionWithProjectsWithSkills[] }>({
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
              sortIndex
              skillsForProject {
                description
                skillForUser {
                  id
                  userId
                  icon
                  skill {
                    name
                    icon
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        companyIds,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { positions: [] } };
    });

  return data.positions;
};
