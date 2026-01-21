import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const deleteFeaturedProject = async ({
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
        mutation deleteFeaturedProject($userId: ID!, $id: ID!) {
          deleteFeaturedProject(userId: $userId, id: $id) {
            id
          }
        }
      `,
      variables: {
        userId,
        id,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
