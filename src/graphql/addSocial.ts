import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const addSocial = async ({
  userId,
  platform,
  ref,
}: {
  userId: string;
  platform: string;
  ref: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addSocial($userId: ID!, $platform: String!, $ref: String!) {
          addSocial(userId: $userId, platform: $platform, ref: $ref) {
            id
          }
        }
      `,
      variables: {
        userId,
        platform,
        ref,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
