import * as Sentry from "@sentry/react";

import { Company } from "@prisma/client";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export type CompanyGraphql = Omit<Company, "startDate" | "endDate"> & {
  startDate: string;
  endDate: string | null;
};

export type CompanyGraphqlGeneric = Omit<CompanyGraphql, "id" | "userId">;

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
    .query<{ companies: CompanyGraphql[] }>({
      query: gql`
        query getCompanies($userId: ID!) {
          companies(userId: $userId, sort: [{ field: "endDate", direction: DESC }]) {
            id
            name
            location
            startDate
            endDate
          }
        }
      `,
      variables: {
        userId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error) => {
      Sentry.captureException(error);

      return { data: { companies: [] } };
    });

  return data.companies;
};
