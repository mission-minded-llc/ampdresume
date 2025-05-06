import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const saveExtractedResumeData = async ({
  userId,
  user,
  skills,
  companies,
  education,
}: {
  userId: string;
  user: {
    name: string;
    email: string;
    location: string | null;
    title: string | null;
  };
  skills: string[];
  companies: {
    name: string;
    location: string | null;
    startDate: string;
    endDate: string | null;
    positions: {
      title: string;
      startDate: string;
      endDate: string | null;
      projects: {
        name: string;
        description: string | null;
      }[];
    }[];
  }[];
  education: {
    school: string;
    degree: string;
    dateAwarded: string;
  }[];
}): Promise<boolean> => {
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
