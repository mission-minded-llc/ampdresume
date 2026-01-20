import { Education } from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

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
    .catch((error: unknown) => {
      Sentry.captureException(error);
      return { data: { education: [] } };
    });

  if (!data) {
    return undefined;
  }

  return data.education;
};
