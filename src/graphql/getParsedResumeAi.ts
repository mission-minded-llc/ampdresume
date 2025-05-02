import * as Sentry from "@sentry/react";

import { Company, Education, User } from "@openresume/theme";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export type ParsedResumeAi = {
  user: {
    name: string;
    email: string;
    location: string;
    title: string;
  };
  skills: string[];
  socialUrls: string[];
  companies: Company[];
  education: Education[];
};

export const getParsedResumeAi = async (userId: string, text: string) => {
  const client = getApolloClient();

  const { data } = await client
    .query<{
      parsedResumeAi: ParsedResumeAi;
    }>({
      query: gql`
        query getParsedResumeAi($userId: ID!, $text: String!) {
          parsedResumeAi(userId: $userId, text: $text) {
            user {
              name
              email
              location
              title
            }
            skills
            socialUrls
            companies {
              name
              location
              startDate
              endDate
              positions {
                title
                startDate
                endDate
                projects {
                  name
                }
              }
            }
            education {
              school
              degree
              dateAwarded
            }
          }
        }
      `,
      variables: { userId, text },
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { parsedResumeAi: null } };
    });

  return data.parsedResumeAi ?? null;
};
