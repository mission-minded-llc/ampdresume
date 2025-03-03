import * as Sentry from "@sentry/react";

import { Company } from "openresume-theme";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export type CompanyGeneric = Omit<Company, "id" | "userId">;

export const getCompanies = async (userId: string | undefined): Promise<Company[] | undefined> => {
  if (!userId) return;

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
