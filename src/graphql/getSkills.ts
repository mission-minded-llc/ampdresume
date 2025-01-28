import * as Sentry from "@sentry/react";

import { Skill } from "@prisma/client";
import { getApolloClient } from "@/lib/apolloClient";
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
      client.stop();

      return { data: { skills: [] } };
    })
    .finally(() => {
      client.stop();
    });

  return skills;
};
