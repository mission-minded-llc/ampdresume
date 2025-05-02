import * as Sentry from "@sentry/node";

import OpenAI from "openai";
import { isFeatureEnabledForUser } from "@/lib/flagsmith";
import { verifySessionOwnership } from "../../util";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getParsedResumeAi = async (
  _: string,
  { userId, text }: { userId: string; text: string },
) => {
  await verifySessionOwnership(userId);

  const enabled = await isFeatureEnabledForUser("import_pdf_ai");

  if (!enabled) {
    throw new Error("PDF Import is not enabled for your account.");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that extracts structured resume 
            data from unstructured text. Return the data as a JSON object in this structure: 
            
            {
              user: {
                name: string,
                email: string,
                location: string,
                title: string,
              },
              skills: string[], // e.g. ["React", "Node.js", "TypeScript"], use the original text.
              socialUrls: string[], // e.g. ["https://www.linkedin.com/in/john-doe", "https://github.com/johndoe"]
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

    return parsedData;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error("Failed to parse resume text");
  }
};
