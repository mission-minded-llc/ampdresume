import { Certification } from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export type CertificationGeneric = Omit<Certification, "id">;

export const getCertifications = async (
  userId: string | undefined,
): Promise<Certification[] | undefined> => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ certifications: Certification[] }>({
      query: gql`
        query getCertifications($userId: ID!) {
          certifications(userId: $userId, sort: [{ field: "dateAwarded", direction: DESC }]) {
            id
            name
            issuer
            dateAwarded
            credentialUrl
            credentialId
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
      return { data: { certifications: [] } };
    });

  if (!data) {
    return undefined;
  }

  return data.certifications;
};
