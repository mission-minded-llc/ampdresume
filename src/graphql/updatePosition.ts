import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const updatePosition = async ({
  id,
  userId,
  title,
  startDate,
  endDate,
}: {
  id: string;
  userId: string;
  title: string;
  startDate: string;
  endDate: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updatePosition(
          $id: ID!
          $userId: ID!
          $title: String!
          $startDate: String!
          $endDate: String
        ) {
          updatePosition(
            id: $id
            userId: $userId
            title: $title
            startDate: $startDate
            endDate: $endDate
          ) {
            id
          }
        }
      `,
      variables: {
        id,
        userId,
        title,
        startDate,
        endDate,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
