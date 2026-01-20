import { Company } from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export type CompanyGeneric = Omit<Company, "id" | "userId">;

export const getExperience = async (userId: string | undefined): Promise<Company[] | undefined> => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ experience: Company[] }>({
      query: gql`
        query getExperience($userId: ID!) {
          experience(userId: $userId, sort: [{ field: "endDate", direction: DESC }]) {
            id
            name
            location
            description
            startDate
            endDate
            positions {
              id
              title
              startDate
              endDate
              projects {
                id
                name
                description
                skillsForProject {
                  id
                  description
                  skillForUser {
                    id
                    icon
                    userId
                    skill {
                      id
                      name
                      icon
                    }
                  }
                }
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
      return { data: { experience: [] } };
    });

  if (!data) {
    return undefined;
  }

  return data.experience;
};
