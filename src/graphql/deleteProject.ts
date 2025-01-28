import * as Sentry from "@sentry/react";

import { getApolloClient, resetApolloClient } from "@/lib/apolloClient";

import { gql } from "@apollo/client";

export const deleteProject = async ({
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
        mutation deleteProject($id: ID!, $userId: ID!) {
          deleteProject(id: $id, userId: $userId) {
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
