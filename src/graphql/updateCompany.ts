import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const updateCompany = async ({
  id,
  userId,
  name,
  location,
  startDate,
  endDate,
}: {
  id: string;
  userId: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateCompany(
          $id: ID!
          $userId: ID!
          $name: String!
          $location: String
          $startDate: String!
          $endDate: String
        ) {
          updateCompany(
            id: $id
            userId: $userId
            name: $name
            location: $location
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
        name,
        location,
        startDate,
        endDate,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
      client.stop();
    })
    .finally(() => {
      client.stop();
    });
};
