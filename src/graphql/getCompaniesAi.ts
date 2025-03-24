import * as Sentry from "@sentry/react";

import { Company } from "@openresume/theme";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const getCompaniesAi = async (userId: string, jobDescription: string) => {
  const client = getApolloClient();

  const { data } = await client
    .query<{
      companiesAi: Company[];
    }>({
      query: gql`
        query getCompaniesAi($userId: ID!, $jobDescription: String!) {
          companiesAi(userId: $userId, jobDescription: $jobDescription) {
            id
            name
            positions {
              id
              title
              projects {
                id
                sortIndex
                name
              }
            }
          }
        }
      `,
      variables: { userId, jobDescription },
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { companiesAi: null } };
    });

  return data.companiesAi ?? [];
};
