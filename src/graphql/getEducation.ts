import * as Sentry from "@sentry/react";

import { Education as EducationServer } from "@prisma/client";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export type Education = Omit<EducationServer, "dateAwarded"> & {
  dateAwarded: string;
};

export type EducationGeneric = Omit<Education, "id" | "userId">;

export const getEducation = async (
  userId: string | undefined,
): Promise<Education[] | undefined> => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ education: Education[] }>({
      query: gql`
        query getEducation($userId: ID!) {
          education(userId: $userId, sort: [{ field: "dateAwarded", direction: DESC }]) {
            id
            school
            degree
            dateAwarded
          }
        }
      `,
      variables: {
        userId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error) => {
      Sentry.captureException(error);
      client.stop();

      return { data: { education: [] } };
    })
    .finally(() => {
      client.stop();
    });

  return data.education;
};
