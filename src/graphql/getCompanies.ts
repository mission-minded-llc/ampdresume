import { Company } from "@ampdresume/theme";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";


export type CompanyGeneric = Omit<Company, "id" | "userId">;

export const getCompanies = async (userId: string): Promise<Company[] | null> => {
  if (!userId) return null;

  const client = getApolloClient();

  const { data } = await client
    .query<{ companies: Company[] }>({
      query: gql`
        query getCompanies($userId: ID!) {
          companies(userId: $userId, sort: [{ field: "endDate", direction: DESC }]) {
            id
            name
            location
            startDate
            endDate
            positionCount
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
