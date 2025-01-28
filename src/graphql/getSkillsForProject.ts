import * as Sentry from "@sentry/react";

import { getApolloClient, resetApolloClient } from "@/lib/apolloClient";

import { SkillForProject } from "@prisma/client";
import { SkillForUserWithSkill } from "./getSkillsForUser";
import { gql } from "@apollo/client";

export interface SkillForProjectWithSkill extends SkillForProject {
  description: string;
  skillForUser: SkillForUserWithSkill;
}

export const getSkillsForProject = async (
  projectId: string | undefined,
): Promise<SkillForProjectWithSkill[] | undefined> => {
  if (!projectId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ skillsForProject: SkillForProjectWithSkill[] }>({
      query: gql`
        query getSkillsForProject($projectId: ID!) {
          skillsForProject(projectId: $projectId) {
            id
            skillForUser {
              id
              skill {
                name
                icon
              }
              icon
              description
            }
            description
          }
        }
      `,
      variables: {
        projectId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error) => {
      Sentry.captureException(error);
      resetApolloClient();

      return { data: { skillsForProject: [] } };
    })
    .finally(() => {
      resetApolloClient();
    });

  return data.skillsForProject;
};
