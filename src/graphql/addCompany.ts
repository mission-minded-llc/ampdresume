import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";

export const addCompany = async ({
  userId,
  name,
  location,
  startDate,
  endDate,
}: {
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
        mutation addCompany(
          $userId: ID!
          $name: String!
          $location: String
          $startDate: String!
          $endDate: String
        ) {
          addCompany(
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
        userId,
        name,
        location,
        startDate,
        endDate,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
