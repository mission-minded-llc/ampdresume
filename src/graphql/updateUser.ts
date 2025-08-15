import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const updateUser = async ({
  userId,
  webThemeName,
}: {
  userId: string;
  webThemeName?: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateUser($userId: ID!, $webThemeName: String) {
          updateUser(userId: $userId, webThemeName: $webThemeName) {
            id
            webThemeName
          }
        }
      `,
      variables: {
        userId,
        webThemeName,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
