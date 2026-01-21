import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const addCertification = async ({
  userId,
  name,
  issuer,
  dateAwarded,
  credentialUrl,
  credentialId,
}: {
  userId: string;
  name: string;
  issuer: string;
  dateAwarded: string;
  credentialUrl?: string | null;
  credentialId?: string | null;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addCertification(
          $userId: ID!
          $name: String!
          $issuer: String!
          $dateAwarded: String!
          $credentialUrl: String
          $credentialId: String
        ) {
          addCertification(
            userId: $userId
            name: $name
            issuer: $issuer
            dateAwarded: $dateAwarded
            credentialUrl: $credentialUrl
            credentialId: $credentialId
          ) {
            id
          }
        }
      `,
      variables: {
        userId,
        name,
        issuer,
        dateAwarded,
        credentialUrl,
        credentialId,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
