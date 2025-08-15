import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

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
}): Promise<void> => {
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
