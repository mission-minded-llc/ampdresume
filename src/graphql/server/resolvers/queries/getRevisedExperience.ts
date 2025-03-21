import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

export interface RevisedExperience {
  company: string;
  position: string;
  projects: string[];
}

export const getRevisedExperience = async (
  _: string,
  {
    userId,
    jobDescription,
  }: {
    userId: string;
    jobDescription: string;
  },
) => {
  await verifySessionOwnership(userId);

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not set.");
  }

  const reviseResumePrompt = `
  Improve a given resume in JSON format to closely match a job description by 
  paraphrasing or editing the existing content and reordering bullet points, 
  ensuring that you do not fabricate new skills or experiences. Bullet points most
  pertinent to the job description should be prioritized at the top. Skills that are
  most pertinent to the job description should be used in the bullet points where
  applicable.
  
  Carefully analyze the job description for key terms, skills, and requirements,
  and revise the resume to highlight these using existing data.

  Some companies can have multiple positions. Do not combine them or change the order
  of the positions. You can change the order of the projects within a position.
  
  # Steps
  
  1. **Analyze the Job Description**: Identify key skills, terms, and 
  responsibilities mentioned.
  
  2. **Review the Resume**: Examine the resume for relevant skills,
  experiences, and bullet points.
  
  3. **Edit for Alignment**: 
  - Paraphrase existing bullet points to incorporate job description terminology.
  - Reorder bullet points to prioritize relevant information.
  
  4. **Avoid Fabrication**: Do not add any skills or experiences not present 
  in the original resume.
  
  5. **Finalize**: Ensure the resume is concise, impactful, and clearly matches 
  the job requirements.
  
  # Output Format
  
  The output should be a JSON version of the original resume text with the same structure,
  adjusted to align with the job description while maintaining accuracy in the representation
  of skills and experiences. Do not return the "Skills" section, but use the individual Skills
  names as applicable within the bullet points. These JSON objects should be structured as follows:
  {
    "experience": [
      {
        "company": "Company Name",
        "position": "Position Title",
        "projects": ["Project 1", "Project 2"]
      }
    ]
  }
  
  # Notes
  - Maintain the authenticity of the resume by preserving factual information.
  - Aim for clarity and conciseness in each bullet point revision.
  - Do not add any new skills or experiences to the resume.
  `;

  // Include 3 free uses, then user needs their own API key.
  // TODO: Track free tier uses monthly in DB, and prompt user to enter their own API key.
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const skillsForUser = await prisma.skillForUser.findMany({
    where: { userId },
    select: { skill: { select: { name: true } } },
  });

  const companies = await prisma.company.findMany({
    where: { userId },
    include: {
      positions: {
        include: {
          projects: true,
        },
      },
    },
  });

  // Organize the experience data into a more readable format
  // before we convert it into text for the AI.
  const experienceItems: RevisedExperience[] = [];

  companies.map((company) => {
    return company.positions.map((position) => {
      experienceItems.push({
        company: company.name,
        position: position.title,
        projects: position.projects.map((project) => project.name),
      });
    });
  });

  let resumeText = "";
  resumeText += "Skills:\n\n";
  resumeText += `${skillsForUser.map((skill) => skill.skill.name).join(", ")}\n\n`;

  resumeText += "Professional Experience:\n\n";
  companies.forEach((company) => {
    company.positions.forEach((position) => {
      resumeText += `${company.name}\n`;
      resumeText += `${position.title}\n`;

      position.projects.forEach((project) => {
        resumeText += `- ${project.name}\n`;
      });
      resumeText += "\n";
    });
  });

  const response = await openai.responses.create({
    model: "gpt-4o",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: reviseResumePrompt,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Resume:\n\n${resumeText}`,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Job Description:\n\n${jobDescription}`,
          },
        ],
      },
    ],
    text: {
      format: {
        type: "json_object",
      },
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true,
  });

  if (!response.output_text) {
    throw new Error("Failed to generate revised experience.");
  }

  let responseJson = null;
  try {
    responseJson = JSON.parse(response.output_text);
  } catch {
    throw new Error("Failed to parse revised experience JSON.");
  }

  if (!responseJson?.experience) {
    throw new Error("Failed to find revised experience in JSON.");
  }

  return responseJson.experience;
};
