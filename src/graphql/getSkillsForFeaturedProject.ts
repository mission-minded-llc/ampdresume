import { SkillForFeaturedProject } from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const getSkillsForFeaturedProject = async (
  featuredProjectId: string | undefined,
): Promise<SkillForFeaturedProject[] | undefined> => {
  if (!featuredProjectId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ skillsForFeaturedProject: SkillForFeaturedProject[] }>({
      query: gql`
        query getSkillsForFeaturedProject($featuredProjectId: ID!) {
          skillsForFeaturedProject(featuredProjectId: $featuredProjectId) {
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
        featuredProjectId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
      return { data: { skillsForFeaturedProject: [] } };
    });

  if (!data) {
    return undefined;
  }

  return data.skillsForFeaturedProject;
};
