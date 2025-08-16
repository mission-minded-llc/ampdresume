import OpenAI from "openai";
import { verifySessionOwnership } from "@/graphql/server/util";
import { isFeatureEnabledForUser } from "@/lib/featureFlags";
import { prisma } from "@/lib/prisma";

export const getCompaniesAi = async (
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

  const enabled = await isFeatureEnabledForUser("ai_assist");

  if (!enabled) {
    throw new Error("AI Assist is not enabled for your account.");
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not set.");
  }

  const reviseResumePrompt = `
  Improve a given resume in JSON format to closely match a job description by 
  paraphrasing or editing the existing content and reordering bullet points. 
  
  Bullet points most pertinent to the job description should be prioritized at 
  the top. Skills that are most pertinent to the job description should be used
  in the bullet points where applicable.
  
  Carefully analyze the job description for key terms, skills, and requirements,
  and revise the resume to highlight these using existing data.
  
  # Steps
  
  1. **Analyze the Job Description**: Identify key skills, terms, and 
  responsibilities.
  
  2. **Review the Resume**: Examine the resume for relevant skills,
  experiences, and bullet points.
  
  3. **Edit for Alignment**: 
  - Paraphrase existing bullet points to incorporate job description terminology.
  - Reorder bullet points to prioritize relevant information higher up in the list,
    especially if it aligns with the job description or mentions any key skills.
  
  4. **Avoid Fabrication**: Do not add any skills or experiences not present 
  in the original resume.
  
  5. **Finalize**: Ensure the resume is concise, impactful, and clearly matches 
  the job requirements.
  
  # Output Format
  
  The output should be a JSON version of the original resume text with the same structure,
  adjusted to align with the job description while maintaining accuracy in the representation
  of skills and experiences. Do not return the "Skills" section, but use the individual Skills
  names as applicable within the bullet points. These JSON should be structured as follows:
  {
    "companies": [
      {
        "id": "0",
        "name": "Company Name",
        "positions": [
          {
            "id": "0",
            "title": "Position Title",
            "projects": [
              {
                id: "0",
                sortIndex: "0",
                name: "Project 1"
              },
              {
                id: "1",
                sortIndex: "1",
                name: "Project 2"
              }
            ],
          }
        ]
      }
    ]
  }

  If the project order is changed, the sortIndex should be updated accordingly.
  The ID should be unique for each company, position, and project, should be a string,
  and should not change between the original and revised resume.
  
  # Notes
  - Maintain the authenticity of the resume by preserving factual information.
  - Aim for clarity and conciseness in each bullet point revision.
  - Do not add any new skills or experiences to the resume.
  - Do not change any position titles or company names.
  - Do not combine positions from the same company.
  - Do not change the order of the positions.
  - You can change the order of the projects within a position.
  `;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const skillsForUser = await prisma.skillForUser.findMany({
    where: { userId },
    select: { skill: { select: { name: true } } },
  });

  const companies = await prisma.company.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      positions: {
        select: {
          id: true,
          title: true,
          projects: {
            select: {
              id: true,
              name: true,
              sortIndex: true,
            },
          },
        },
      },
    },
  });

  const inputJson = {
    skills: skillsForUser.map((skill) => skill.skill.name),
    companies,
  };

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
            text: JSON.stringify(inputJson),
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
    max_output_tokens: 4096,
    top_p: 1,
    store: true,
  });

  return JSON.parse(response.output_text).companies;
};
