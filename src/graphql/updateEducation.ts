import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const updateEducation = async ({
  id,
  userId,
  school,
  degree,
  dateAwarded,
}: {
  id: string;
  userId: string;
  school: string;
  degree: string;
  dateAwarded: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateEducation(
          $id: ID!
          $userId: ID!
          $school: String!
          $degree: String!
          $dateAwarded: String!
        ) {
          updateEducation(
            id: $id
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
        id,
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
