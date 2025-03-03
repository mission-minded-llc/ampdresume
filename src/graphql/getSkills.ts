import * as Sentry from "@sentry/react";

import { Skill } from "openresume-theme";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

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
