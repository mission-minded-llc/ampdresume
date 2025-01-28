import * as Sentry from "@sentry/react";

import { getApolloClient, resetApolloClient } from "@/lib/apolloClient";

import { Skill } from "@prisma/client";
import { gql } from "@apollo/client";

export type SkillType = "user" | "project";

/**
 * Used to fetch all skills as part of a search/selector.
 *
 * @returns {Skill[]} all available skills.
 */
export const getSkills = async (): Promise<{ skills: Skill[] }> => {
  const client = getApolloClient();

  const { data: skills } = await client
    .query<{ skills: Skill[] }>({
      query: gql`
        query getSkills {
          skills {
            id
            name
            icon
          }
        }
      `,
    })
    .catch((error) => {
      Sentry.captureException(error);
      resetApolloClient();

      return { data: { skills: [] } };
    })
    .finally(() => {
      resetApolloClient();
    });

  return skills;
};
