import { SkillForUser } from "@ampdresume/theme";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";

/**
 * Used to fetch all skills for a specific user.
 *
 * @param userId - the user ID to fetch skills for.
 * @returns {SkillForUser[]} all skills for the user, including the parent skill.
 */
export const getSkillsForUser = async (
  userId: string | undefined,
): Promise<SkillForUser[] | undefined> => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ skillsForUser: SkillForUser[] }>({
      query: gql`
        query getSkillsForUser($userId: ID!) {
          skillsForUser(userId: $userId) {
            id
            userId
            skill {
              id
              name
              icon
            }
            icon
            description
            yearStarted
            totalYears
          }
        }
      `,
      variables: {
        userId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { skillsForUser: [] } };
    });

  return data.skillsForUser;
};
