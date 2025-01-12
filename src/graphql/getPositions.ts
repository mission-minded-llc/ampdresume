import * as Sentry from "@sentry/react";

import { Company, Position, Project, Skill, SkillForProject } from "@prisma/client";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export interface SkillForProjectWithSkill extends SkillForProject {
  skillForUser: Skill;
}

export interface ProjectWithSkills extends Project {
  skillsForProject: SkillForProjectWithSkill[];
}

export interface PositionWithProjects extends Omit<Position, "startDate" | "endDate"> {
  company: Company;
  projects: ProjectWithSkills[];
  startDate: string;
  endDate: string;
}

/**
 * Used to fetch all positions for a specific company.
 *
 * @param {string[]} companyIds - the company IDs to fetch positions for.
 * @returns {PositionWithProjects[]} all positions for the company, including projects for each position.
 */
export const getPositions = async (companyIds: string[]): Promise<PositionWithProjects[]> => {
  const client = getApolloClient();

  const { data } = await client
    .query<{ positions: PositionWithProjects[] }>({
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
      fetchPolicy: "no-cache",
    })
    .catch((error) => {
      Sentry.captureException(error);

      return { data: { positions: [] } };
    });

  return data.positions;
};
