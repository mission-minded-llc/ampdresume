import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";

export const updatePosition = async ({
  id,
  companyId,
  userId,
  title,
  startDate,
  endDate,
}: {
  id: string;
  companyId: string;
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
          $companyId: ID!
          $userId: ID!
          $title: String!
          $startDate: String!
          $endDate: String
        ) {
          updatePosition(
            id: $id
            companyId: $companyId
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
        companyId,
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
