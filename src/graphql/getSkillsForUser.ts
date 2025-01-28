import * as Sentry from "@sentry/react";

import { Skill, SkillForUser } from "@prisma/client";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export interface SkillForUserWithSkill extends SkillForUser {
  skill: Skill;
}

/**
 * Used to fetch all skills for a specific user.
 *
 * @param userId - the user ID to fetch skills for.
 * @returns {SkillForUserWithSkill[]} all skills for the user, including the parent skill.
 */
export const getSkillsForUser = async (
  userId: string | undefined,
): Promise<SkillForUserWithSkill[] | undefined> => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ skillsForUser: SkillForUserWithSkill[] }>({
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
