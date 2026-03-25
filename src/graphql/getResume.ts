import {
  Certification,
  Company,
  Education,
  FeaturedProject,
  SkillForUser,
  Social,
  ThemeName,
  User,
} from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

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
        certifications: Certification[];
        featuredProjects: FeaturedProject[];
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
              description
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
                  sortIndex
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
            certifications {
              id
              name
              issuer
              dateAwarded
              credentialUrl
              credentialId
            }
            featuredProjects {
              id
              name
              description
              links {
                label
                url
              }
              skillsForFeaturedProject {
                id
                description
                skillForUser {
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
              }
            }
          }
        }
      `,
      variables: { slug },
      // Singleton Apollo on the server defaults to cache-first; without this, refreshes keep
      // stale data in dev and production until the process restarts.
      fetchPolicy: "no-cache",
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
      return { data: { resume: null } };
    });

  if (!data) {
    return null;
  }

  return data.resume;
};
