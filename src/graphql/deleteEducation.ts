import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

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
    });
};
