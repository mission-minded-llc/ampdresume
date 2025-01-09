import * as Sentry from "@sentry/react";

import { Company } from "@prisma/client";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

/**
 * Used to fetch all companies for a specific user.
 *
 * @param userId - the user ID to fetch companies for.
 * @returns all companies for the user.
 */
export const getCompanies = async (userId: string | undefined) => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ companies: Company[] }>({
      query: gql`
        query getCompanies($userId: ID!) {
          companies(userId: $userId, sort: [{ field: "endDate", direction: DESC }]) {
            id
            name
            startDate
            endDate
          }
        }
      `,
      variables: {
        userId,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);

      return { data: { companies: [] } };
    });

  return data.companies;
};
