import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const updateSocialSortIndexes = async ({
  userId,
  socialSortIndexes,
}: {
  userId: string;
  socialSortIndexes: Array<{ id: string; sortIndex: number }>;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateSocialSortIndexes(
          $userId: ID!
          $socialSortIndexes: [SocialSortIndexInput!]!
        ) {
          updateSocialSortIndexes(userId: $userId, socialSortIndexes: $socialSortIndexes)
        }
      `,
      variables: {
        userId,
        socialSortIndexes,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
      throw error;
    });
};
