import { Company, Education, Skill } from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { ParsedResumeData } from "@/app/edit/import/types";
import { getApolloClient } from "@/lib/apolloClient";

export type ParsedResumeAi = {
  user: {
    name: string;
    displayEmail: string;
    location: string;
    title: string;
  };
  skills: Skill[];
  companies: Company[];
  education: Education[];
};

export const getParsedResumeAi = async (
  userId: string,
  text: string,
): Promise<ParsedResumeData | null> => {
  const client = getApolloClient();

  const { data } = await client
    .query<{
      parsedResumeAi: ParsedResumeAi;
    }>({
      query: gql`
        query getParsedResumeAi($userId: ID!, $text: String!) {
          parsedResumeAi(userId: $userId, text: $text) {
            user {
              name
              displayEmail
              location
              title
            }
            skills {
              id
              name
              icon
            }
            companies {
              name
              location
              startDate
              endDate
              positions {
                title
                startDate
                endDate
                projects {
                  name
                }
              }
            }
            education {
              school
              degree
              dateAwarded
            }
          }
        }
      `,
      variables: { userId, text },
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { parsedResumeAi: null } };
    });

  if (!data.parsedResumeAi) return null;

  // Transform the data to match ParsedResumeData structure
  return {
    user: data.parsedResumeAi.user,
    skills: data.parsedResumeAi.skills,
    companies: data.parsedResumeAi.companies.map((company) => ({
      name: company.name,
      location: company.location,
      startDate: company.startDate,
      endDate: company.endDate,
      positions:
        company.positions?.map((position) => ({
          title: position.title,
          startDate: position.startDate,
          endDate: position.endDate,
          projects:
            position.projects?.map((project) => ({
              name: project.name,
              description: null,
            })) || [],
        })) || [],
    })),
    education: data.parsedResumeAi.education.map((edu) => ({
      school: edu.school,
      degree: edu.degree,
      dateAwarded: edu.dateAwarded,
    })),
  };
};
