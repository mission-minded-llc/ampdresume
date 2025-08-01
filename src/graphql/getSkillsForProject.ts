import { SkillForProject } from "@ampdresume/theme";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";


export const getSkillsForProject = async (
  projectId: string | undefined,
): Promise<SkillForProject[] | undefined> => {
  if (!projectId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ skillsForProject: SkillForProject[] }>({
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
