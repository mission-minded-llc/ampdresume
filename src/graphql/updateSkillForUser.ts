import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

/**
 * Used to update a skill for a user.
 *
 * @param id - the skill ID to update.
 * @param userId - the user ID to update the skill for.
 * @param skillId - the skill ID to update.
 * @param yearValue - the year value to update.
 */
export const updateSkillForUser = async ({
  id,
  userId,
  yearStarted,
  totalYears,
  description,
}: {
  id: string;
  userId: string;
  yearStarted: number;
  totalYears: number;
  description: string;
}) => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateSkillForUser(
          $id: ID!
          $userId: ID!
          $yearStarted: Int
          $totalYears: Int
          $description: String
        ) {
          updateSkillForUser(
            id: $id
            userId: $userId
            yearStarted: $yearStarted
            totalYears: $totalYears
            description: $description
          ) {
            id
          }
        }
      `,
      variables: {
        id,
        userId,
        yearStarted,
        totalYears,
        description,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
