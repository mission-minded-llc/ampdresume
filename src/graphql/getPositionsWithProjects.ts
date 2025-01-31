import * as Sentry from "@sentry/react";

import { Company, Position as PositionServer, Project } from "@prisma/client";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export interface Position extends Omit<PositionServer, "startDate" | "endDate"> {
  startDate: string;
  endDate: string;
}

export type PositionGeneric = Omit<Position, "id" | "companyId">;

export interface PositionWithProjects extends Position {
  company: Company;
  projects: Project[];
}

/**
 * Used to fetch all positions for a specific company, excluding
 * the skills for each project. This saves on bandwidth when we
 * don't need the skills for a project, specifically during editing.
 *
 * @param {string[]} companyIds - the company IDs to fetch positions for.
 * @returns {PositionWithProjects[]} all positions for the company, including projects for each position.
 */
export const getPositionsWithProjects = async (
  companyIds: string[],
): Promise<PositionWithProjects[]> => {
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
              sortIndex
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
