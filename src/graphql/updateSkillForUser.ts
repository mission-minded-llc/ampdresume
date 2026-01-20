import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

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
  icon,
}: {
  id: string;
  userId: string;
  yearStarted: number;
  totalYears: number;
  description: string | null;
  icon: string | null | undefined;
}): Promise<void> => {
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
          $icon: String
        ) {
          updateSkillForUser(
            id: $id
            userId: $userId
            yearStarted: $yearStarted
            totalYears: $totalYears
            description: $description
            icon: $icon
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
        icon,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
