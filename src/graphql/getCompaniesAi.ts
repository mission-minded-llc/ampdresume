import { Company } from "@ampdresume/theme";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";


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
