import * as Sentry from "@sentry/react";

import { getApolloClient, resetApolloClient } from "@/lib/apolloClient";

import { gql } from "@apollo/client";

export const deleteEducation = async ({
  userId,
  id,
}: {
  userId: string;
  id: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation deleteEducation($userId: ID!, $id: ID!) {
          deleteEducation(userId: $userId, id: $id) {
            id
          }
        }
      `,
      variables: {
        userId,
        id,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    })
    .finally(() => {
      resetApolloClient();
    });
};
