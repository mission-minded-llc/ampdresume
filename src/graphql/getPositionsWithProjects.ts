import * as Sentry from "@sentry/react";

import { Position } from "openresume-theme";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export type PositionGeneric = Omit<Position, "id" | "companyId">;

/**
 * Used to fetch all positions for a specific company, excluding
 * the skills for each project. This saves on bandwidth when we
 * don't need the skills for a project, specifically during editing.
 *
 * @param {string[]} companyIds - the company IDs to fetch positions for.
 * @returns {Position[]} all positions for the company, including projects for each position.
 */
export const getPositionsWithProjects = async (companyIds: string[]): Promise<Position[]> => {
  const client = getApolloClient();

  const { data } = await client
    .query<{ positions: Position[] }>({
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
