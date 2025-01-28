import * as Sentry from "@sentry/react";

import { getApolloClient, resetApolloClient } from "@/lib/apolloClient";

import { gql } from "@apollo/client";

export const updatePosition = async ({
  id,
  userId,
  companyId,
  title,
  startDate,
  endDate,
}: {
  id: string;
  userId: string;
  companyId: string;
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
          $companyId: ID!
          $title: String!
          $startDate: String!
          $endDate: String
        ) {
          updatePosition(
            id: $id
            userId: $userId
            companyId: $companyId
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
        companyId,
        title,
        startDate,
        endDate,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    })
    .finally(() => {
      resetApolloClient();
    });
};
