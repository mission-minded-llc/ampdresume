import * as Sentry from "@sentry/react";

import { Project } from "@ampdresume/theme";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const getProjects = async (positionId: string): Promise<Project[] | null> => {
  if (!positionId) return null;

  const client = getApolloClient();

  const { data } = await client
    .query<{ projects: Project[] }>({
      query: gql`
        query getProjects($positionId: ID!) {
          projects(positionId: $positionId) {
            id
            name
            description
            skillsForProject {
              id
              description
              skillForUser {
                id
                icon
                userId
                skill {
                  id
                  name
                  icon
                }
              }
            }
          }
        }
      `,
      variables: {
        positionId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { projects: [] } };
    });

  return data.projects;
};
