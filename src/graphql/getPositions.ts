import * as Sentry from "@sentry/react";

import { Position } from "@openresume/theme";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

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
          }
        }
      `,
      variables: {
        companyId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { positions: [] } };
    });

  return data.positions;
};
