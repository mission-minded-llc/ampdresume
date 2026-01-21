import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const updateCertification = async ({
  id,
  userId,
  name,
  issuer,
  dateAwarded,
  credentialUrl,
  credentialId,
}: {
  id: string;
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
        mutation updateCertification(
          $id: ID!
          $userId: ID!
          $name: String!
          $issuer: String!
          $dateAwarded: String!
          $credentialUrl: String
          $credentialId: String
        ) {
          updateCertification(
            id: $id
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
        id,
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
