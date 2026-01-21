import { Position } from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const getPositions = async (companyId: string): Promise<Position[] | null> => {
  if (!companyId) return null;

  const client = getApolloClient();

  const { data } = await client
    .query<{ positions: Position[] }>({
      query: gql`
        query getPositions($companyId: ID!) {
          positions(companyId: $companyId, sort: [{ field: "endDate", direction: DESC }]) {
            id
            title
            startDate
            endDate
            company {
              id
            }
            projectCount
          }
        }
      `,
      variables: {
        companyId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
      return { data: { positions: [] } };
    });

  if (!data) {
    return null;
  }

  return data.positions;
};
