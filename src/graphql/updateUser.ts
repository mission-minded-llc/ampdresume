import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const updateUser = async ({
  userId,
  webThemeName,
  pdfThemeName,
}: {
  userId: string;
  webThemeName?: string;
  pdfThemeName?: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateUser($userId: ID!, $webThemeName: String, $pdfThemeName: String) {
          updateUser(userId: $userId, webThemeName: $webThemeName, pdfThemeName: $pdfThemeName) {
            id
            webThemeName
            pdfThemeName
          }
        }
      `,
      variables: {
        userId,
        webThemeName,
        pdfThemeName,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
