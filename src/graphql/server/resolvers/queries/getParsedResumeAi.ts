import OpenAI from "openai";
import * as Sentry from "@sentry/node";
import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "../../util";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getParsedResumeAi = async (
  _: string,
  { userId, text }: { userId: string; text: string }
) => {
  await verifySessionOwnership(userId);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that extracts structured resume 
            data from unstructured text. The resume text should include companies,
            positions, projects, skills, and education. If skills are not an explicit
            list, extract them from the text. If projects are not an explicit list, they
            are usually near each position, sometimes prefixed with "Projects" or 
            "Projects and Responsibilities" and may or may not have bullet points.
            
            Return the data as a JSON object in this structure: 
            
            {
              user: {
                name: string,
                displayEmail: string,
                location: string,
                title: string,
              },
              skills: string[], // e.g. ["React", "Node.js", "TypeScript"], use the original text.
              companies: {
                name: string,
                location: string,
                startDate: string, // Convert to YYYY-MM format.
                endDate: string, // Convert to YYYY-MM format, if current, return null.
                positions: {
                  title: string, // If not found, return empty string.
                  startDate: string, // Convert to YYYY-MM format.
                  endDate: string, // Convert to YYYY-MM format.
                  projects: {
                    name: string, // Do not rephrase or change any of these values from the original text. Keep all the original project items.
                  }[],
                }[],
              }[],
              education: { // If multiple degrees from same school, return multiple objects.
                school: string,
                degree: string,
                dateAwarded: string, // Convert to YYYY-MM format.
              }[],
            }
            `,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;

    if (!content) throw new Error("No content received from OpenAI");

    const parsedData = JSON.parse(content);

    // Run a fuzzy match on the skills so that we can return any skills that are actually
    // found in the database.
    const fuzzySkillsMatches = await prisma.skill.findMany({
      where: {
        OR: parsedData.skills
          .filter((skill: string) => skill.length > 4)
          .map((skill: string) => ({
            name: {
              contains: skill,
              mode: "insensitive",
            },
          })),
      },
      take: 30, // Limit to 30 fuzzy matches.
    });

    return {
      ...parsedData,
      skills: fuzzySkillsMatches,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error("Failed to parse resume text");
  }
};
