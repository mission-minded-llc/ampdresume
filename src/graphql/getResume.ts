import * as Sentry from "@sentry/react";

import { Company, Education, ThemeName } from "@ampdresume/theme";
import { Social, User } from "@ampdresume/theme";

import { SkillForUser } from "@ampdresume/theme";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export type UserWithTheme = User & { webThemeName: ThemeName };

export const getResume = async (slug: string) => {
  const client = getApolloClient();

  const { data } = await client
    .query<{
      resume: {
        user: UserWithTheme;
        socials: Social[];
        skillsForUser: SkillForUser[];
        companies: Company[];
        education: Education[];
      };
    }>({
      query: gql`
        query getResume($slug: String!) {
          resume(slug: $slug) {
            user {
              id
              name
              displayEmail
              location
              title
              siteTitle
              siteDescription
              siteImage
              webThemeName
            }
            socials {
              id
              userId
              platform
              ref
            }
            skillsForUser {
              id
              userId
              skill {
                id
                name
                icon
              }
              icon
              description
              yearStarted
              totalYears
            }
            companies {
              id
              name
              location
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
            education {
              id
              school
              degree
              dateAwarded
            }
          }
        }
      `,
      variables: { slug },
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { resume: null } };
    });

  return data.resume;
};
