import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const deletePosition = async ({
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
        mutation deletePosition($id: ID!, $userId: ID!) {
          deletePosition(id: $id, userId: $userId) {
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
    });
};
