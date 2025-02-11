import * as Sentry from "@sentry/react";

import { Social, User } from "@prisma/client";

import { CompanyWithPositionsWithProjectsWithSkills } from "./getCompanies";
import { Education } from "./getEducation";
import { SkillForUserWithSkill } from "./getSkillsForUser";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const getResume = async (slug: string) => {
  const client = getApolloClient();

  const { data } = await client
    .query<{
      resume: {
        user: User;
        socials: Social[];
        skillsForUser: SkillForUserWithSkill[];
        companies: CompanyWithPositionsWithProjectsWithSkills[];
        education: Education[];
      };
    }>({
      query: gql`
        query getResume($slug: String!) {
          resume(slug: $slug) {
            user {
              id
              name
              email
              displayEmail
              location
              title
              siteTitle
              siteDescription
              siteImage
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
                  skillsForProject {
                    id
                    skillForUser {
                      id
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
