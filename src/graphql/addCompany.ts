import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const addCompany = async ({
  userId,
  name,
  location,
  startDate,
  endDate,
  description,
}: {
  userId: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
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
          $description: String
        ) {
          addCompany(
            userId: $userId
            name: $name
            location: $location
            startDate: $startDate
            endDate: $endDate
            description: $description
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
        description,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
