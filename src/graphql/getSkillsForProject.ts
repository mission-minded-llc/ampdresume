import * as Sentry from "@sentry/react";

import { SkillForProject } from "@prisma/client";
import { SkillForUserWithSkill } from "./getSkillsForUser";
import { getApolloClient } from "@/lib/apolloClient";
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
      return { data: { skillsForProject: [] } };
    });

  return data.skillsForProject;
};
