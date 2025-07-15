import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const deleteUser = async ({ userId }: { userId: string }): Promise<boolean> => {
  const client = getApolloClient();

  try {
    const result = await client.mutate({
      mutation: gql`
        mutation deleteUser($userId: ID!) {
          deleteUser(userId: $userId)
        }
      `,
      variables: {
        userId,
      },
    });

    return result.data?.deleteUser || false;
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};
