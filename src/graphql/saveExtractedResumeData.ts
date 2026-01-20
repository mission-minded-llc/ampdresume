import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { ParsedResumeDataSubmission } from "@/app/edit/import/types";
import { getApolloClient } from "@/lib/apolloClient";

export const saveExtractedResumeData = async ({
  userId,
  user,
  skillIds,
  companies,
  education,
}: ParsedResumeDataSubmission): Promise<boolean> => {
  const client = getApolloClient();

  const { data } = await client
    .mutate<{ saveExtractedResumeData: boolean }>({
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
    .catch((error: unknown) => {
      Sentry.captureException(error);
      throw error;
    });

  if (!data) {
    throw new Error("Failed to save extracted resume data");
  }

  return data.saveExtractedResumeData;
};
