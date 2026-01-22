import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const addSkillForFeaturedProject = async ({
  userId,
  featuredProjectId,
  skillForUserId,
}: {
  userId: string;
  featuredProjectId: string;
  skillForUserId: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addSkillForFeaturedProject(
          $userId: ID!
          $featuredProjectId: ID!
          $skillForUserId: ID!
        ) {
          addSkillForFeaturedProject(
            userId: $userId
            featuredProjectId: $featuredProjectId
            skillForUserId: $skillForUserId
          ) {
            id
          }
        }
      `,
      variables: {
        userId,
        featuredProjectId,
        skillForUserId,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
