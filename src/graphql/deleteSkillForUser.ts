import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

/**
 * Used to delete a skill for a user.
 *
 * @param userId - the user ID to delete the skill for.
 * @param id - the skill ID to delete.
 * @returns success or failure.
 */
export const deleteSkillForUser = async ({ userId, id }: { userId: string; id: string }) => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateSkillForUser($id: ID!, $userId: ID!) {
          deleteSkillForUser(id: $id, userId: $userId) {
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
