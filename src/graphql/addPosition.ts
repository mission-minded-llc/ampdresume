import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const addPosition = async ({
  userId,
  companyId,
  title,
  startDate,
  endDate,
}: {
  userId: string;
  companyId: string;
  title: string;
  startDate: string;
  endDate: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addPosition(
          $userId: ID!
          $companyId: ID!
          $title: String!
          $startDate: String!
          $endDate: String
        ) {
          addPosition(
            userId: $userId
            companyId: $companyId
            title: $title
            startDate: $startDate
            endDate: $endDate
          ) {
            id
          }
        }
      `,
      variables: {
        userId,
        companyId,
        title,
        startDate,
        endDate,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
