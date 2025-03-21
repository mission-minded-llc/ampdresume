import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const getRevisedExperience = async (userId: string, jobDescription: string) => {
  const client = getApolloClient();

  const { data } = await client
    .query<{
      revisedExperience: {
        company: string;
        position: string;
        responsibilities: string[];
      }[];
    }>({
      query: gql`
        query getRevisedExperience($userId: String!, $jobDescription: String!) {
          experience(jobDescription: $jobDescription) {
            company
            position
            responsibilities
          }
        }
      `,
      variables: { userId, jobDescription },
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { revisedExperience: null } };
    });

  return data.revisedExperience;
};
