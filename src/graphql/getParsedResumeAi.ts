import { Company, Education, Position, Project, Skill } from "@/types";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { ParsedResumeData } from "@/app/edit/import/types";
import { getApolloClient } from "@/lib/apolloClient";

const getClientParseErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object") {
    const graphQLErrors =
      "graphQLErrors" in error
        ? (error as { graphQLErrors: { message?: string }[] }).graphQLErrors
        : "errors" in error
          ? (error as { errors: { message?: string }[] }).errors
          : null;

    if (Array.isArray(graphQLErrors) && graphQLErrors[0]?.message) {
      return graphQLErrors[0].message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to parse resume text";
};

export type ParsedResumeAi = {
  user: {
    name: string;
    displayEmail?: string | null;
    location?: string | null;
    title?: string | null;
    summary?: string | null;
    summaryTitle?: string | null;
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
              summary
              summaryTitle
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
    .catch((error: unknown) => {
      Sentry.captureException(error);
      throw new Error(getClientParseErrorMessage(error));
    });

  if (!data || !data.parsedResumeAi) {
    throw new Error("Failed to parse resume text");
  }

  // Transform the data to match ParsedResumeData structure
  return {
    user: {
      name: data.parsedResumeAi.user.name,
      displayEmail: data.parsedResumeAi.user.displayEmail ?? "",
      location: data.parsedResumeAi.user.location ?? "",
      title: data.parsedResumeAi.user.title ?? "",
      summary: data.parsedResumeAi.user.summary ?? "",
      summaryTitle: data.parsedResumeAi.user.summaryTitle ?? "",
    },
    skills: data.parsedResumeAi.skills,
    companies: data.parsedResumeAi.companies.map((company: Company) => ({
      name: company.name,
      location: company.location,
      startDate: company.startDate,
      endDate: company.endDate,
      positions:
        company.positions?.map((position: Position) => ({
          title: position.title,
          startDate: position.startDate,
          endDate: position.endDate,
          projects:
            position.projects?.map((project: Project) => ({
              name: project.name,
              description: null,
            })) || [],
        })) || [],
    })),
    education: data.parsedResumeAi.education.map((edu: Education) => ({
      school: edu.school,
      degree: edu.degree,
      dateAwarded: edu.dateAwarded,
    })),
  };
};
