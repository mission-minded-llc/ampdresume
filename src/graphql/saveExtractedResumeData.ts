import * as Sentry from "@sentry/react";

import { ParsedResumeDataSubmission } from "@/app/edit/import/types";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const saveExtractedResumeData = async ({
  userId,
  user,
  skillIds,
  companies,
  education,
}: ParsedResumeDataSubmission): Promise<boolean> => {
  const client = getApolloClient();

  const { data } = await client
    .mutate({
      mutation: gql`
        mutation saveExtractedResumeData(
          $userId: ID!
          $user: UserInput!
          $skillIds: [ID!]!
          $companies: [CompanyInput!]!
          $education: [EducationInput!]!
        ) {
          saveExtractedResumeData(
            userId: $userId
            user: $user
            skillIds: $skillIds
            companies: $companies
            education: $education
          )
        }
      `,
      variables: {
        userId,
        user,
        skillIds,
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
