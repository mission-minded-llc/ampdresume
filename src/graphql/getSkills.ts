import { Skill } from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

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
      return { data: { skills: [] } };
    });

  return skills;
};
