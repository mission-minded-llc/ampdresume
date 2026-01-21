import { FeaturedProject } from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export type FeaturedProjectGeneric = Omit<FeaturedProject, "id" | "skillsForFeaturedProject">;

export const getFeaturedProjects = async (
  userId: string | undefined,
): Promise<FeaturedProject[] | undefined> => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ featuredProjects: FeaturedProject[] }>({
      query: gql`
        query getFeaturedProjects($userId: ID!) {
          featuredProjects(userId: $userId, sort: [{ field: "name", direction: ASC }]) {
            id
            name
            description
            links {
              label
              url
            }
            skillsForFeaturedProject {
              id
              description
              skillForUser {
                id
                userId
                skill {
                  id
                  name
                  icon
                }
                icon
                description
                yearStarted
                totalYears
              }
            }
          }
        }
      `,
      variables: {
        userId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
      return { data: { featuredProjects: [] } };
    });

  if (!data) {
    return undefined;
  }

  return data.featuredProjects;
};
