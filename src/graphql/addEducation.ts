import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const addEducation = async ({
  userId,
  school,
  degree,
  dateAwarded,
}: {
  userId: string;
  school: string;
  degree: string;
  dateAwarded: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addEducation(
          $userId: ID!
          $school: String!
          $degree: String!
          $dateAwarded: String!
        ) {
          addEducation(
            userId: $userId
            school: $school
            degree: $degree
            dateAwarded: $dateAwarded
          ) {
            id
          }
        }
      `,
      variables: {
        userId,
        school,
        degree,
        dateAwarded,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
