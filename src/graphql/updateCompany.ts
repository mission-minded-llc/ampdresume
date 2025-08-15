import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const updateCompany = async ({
  id,
  userId,
  name,
  description,
  location,
  startDate,
  endDate,
}: {
  id: string;
  userId: string;
  name: string;
  description: string;
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
          $description: String
          $location: String
          $startDate: String!
          $endDate: String
        ) {
          updateCompany(
            id: $id
            userId: $userId
            name: $name
            description: $description
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
        description,
        location,
        startDate,
        endDate,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
