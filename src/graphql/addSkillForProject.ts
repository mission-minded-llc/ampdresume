import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const addSkillForProject = async ({
  userId,
  projectId,
  skillForUserId,
}: {
  userId: string;
  projectId: string;
  skillForUserId: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addSkillForProject($userId: ID!, $projectId: ID!, $skillForUserId: ID!) {
          addSkillForProject(
            userId: $userId
            projectId: $projectId
            skillForUserId: $skillForUserId
          ) {
            id
          }
        }
      `,
      variables: {
        userId,
        projectId,
        skillForUserId,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
