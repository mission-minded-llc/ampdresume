import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";

export const addProject = async ({
  userId,
  positionId,
  name,
}: {
  userId: string;
  positionId: string;
  name: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addProject($userId: ID!, $positionId: ID!, $name: String!) {
          addProject(userId: $userId, positionId: $positionId, name: $name) {
            id
          }
        }
      `,
      variables: {
        userId,
        positionId,
        name,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
