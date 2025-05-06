import * as Sentry from "@sentry/react";

import { ParsedResumeData } from "@/app/edit/import/types";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const saveExtractedResumeData = async ({
  userId,
  user,
  skills,
  companies,
  education,
}: ParsedResumeData): Promise<boolean> => {
  const client = getApolloClient();

  const { data } = await client
    .mutate({
      mutation: gql`
        mutation saveExtractedResumeData(
          $userId: ID!
          $user: UserInput!
          $skills: [String!]!
          $companies: [CompanyInput!]!
          $education: [EducationInput!]!
        ) {
          saveExtractedResumeData(
            userId: $userId
            user: $user
            skills: $skills
            companies: $companies
            education: $education
          )
        }
      `,
      variables: {
        userId,
        user,
        skills,
        companies,
        education,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
      throw error;
    });

  return data.saveExtractedResumeData;
};
