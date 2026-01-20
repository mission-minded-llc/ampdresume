import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const updateSocial = async ({
  id,
  userId,
  ref,
}: {
  id: string;
  userId: string;
  ref: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateSocial($id: ID!, $userId: ID!, $ref: String!) {
          updateSocial(id: $id, userId: $userId, ref: $ref) {
            id
          }
        }
      `,
      variables: {
        id,
        userId,
        ref,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
