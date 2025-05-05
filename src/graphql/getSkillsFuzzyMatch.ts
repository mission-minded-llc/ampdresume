import * as Sentry from "@sentry/react";

import { Skill } from "@openresume/theme";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const getSkillsFuzzyMatch = async (skills: string[]) => {
  const client = getApolloClient();

  const { data: skillsMatched } = await client
    .query<{ skillsFuzzyMatch: Skill[] }>({
      query: gql`
        query getSkillsFuzzyMatch($skills: [String!]!) {
          skillsFuzzyMatch(skills: $skills) {
            id
            name
            icon
          }
        }
      `,
      variables: { skills },
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { skillsFuzzyMatch: [] } };
    });

  return skillsMatched.skillsFuzzyMatch;
};
