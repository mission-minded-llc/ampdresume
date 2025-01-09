import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

/**
 * Used to add a skill to a user.
 *
 * @param userId - the user ID to add the skill to.
 * @param skillId - the skill ID to add to the user.
 */
export const addSkillForUser = async ({
  userId,
  skillId,
  yearStarted,
  totalYears,
}: {
  userId: string;
  skillId: string;
  yearStarted: number;
  totalYears: number;
}) => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addSkillForUser($userId: ID!, $skillId: ID!, $yearStarted: Int, $totalYears: Int) {
          addSkillForUser(
            userId: $userId
            skillId: $skillId
            yearStarted: $yearStarted
            totalYears: $totalYears
          ) {
            id
          }
        }
      `,
      variables: {
        userId,
        skillId,
        yearStarted,
        totalYears,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
