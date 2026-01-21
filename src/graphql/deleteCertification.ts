import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const deleteCertification = async ({
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
        mutation deleteCertification($userId: ID!, $id: ID!) {
          deleteCertification(userId: $userId, id: $id) {
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
