import * as Sentry from "@sentry/react";

import { Company, Project, Skill, SkillForProject } from "@prisma/client";

import type { Position as PositionServer } from "@prisma/client";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export interface SkillForProjectWithSkill extends SkillForProject {
  skillForUser: Skill;
}

export interface ProjectWithSkills extends Project {
  skillsForProject: SkillForProjectWithSkill[];
}

export interface Position extends Omit<PositionServer, "startDate" | "endDate"> {
  startDate: string;
  endDate: string;
}

export type PositionGeneric = Omit<Position, "id" | "companyId">;

export interface PositionWithProjects extends Position {
  company: Company;
  projects: ProjectWithSkills[];
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
