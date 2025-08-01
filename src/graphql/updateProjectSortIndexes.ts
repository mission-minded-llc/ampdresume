import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";

export const updateProjectSortIndexes = async ({
  userId,
  positionId,
  projectSortIndexes,
}: {
  userId: string;
  positionId: string;
  projectSortIndexes: Array<{ id: string; sortIndex: number }>;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateProjectSortIndexes(
          $userId: ID!
          $positionId: ID!
          $projectSortIndexes: [ProjectSortIndexInput!]!
        ) {
          updateProjectSortIndexes(
            userId: $userId
            positionId: $positionId
            projectSortIndexes: $projectSortIndexes
          )
        }
      `,
      variables: {
        userId,
        positionId,
        projectSortIndexes,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
