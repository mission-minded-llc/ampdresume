import { Company, Education, Position, Project, Skill, User } from "@/types";

/**
 * The file object for a PDF file, used during the initial
 * text extraction process.
 */
export interface PDFFile extends File {
  arrayBuffer: () => Promise<ArrayBuffer>;
}

/**
 * A text item from the PDF, used during the initial
 * text extraction process.
 */
export interface TextItem {
  str: string;
  hasEOL: boolean;
  transform: number[];
  width: number;
  height: number;
  fontName: string;
}

/**
 * The event object for a file upload, used during the initial
 * text extraction process.
 */
export interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList };
}

/**
 * The extracted objects, used during the initial
 * text extraction process.
 */
export type ExtractedUser = Omit<User, "id"> & {
  email: string;
};

export type ExtractedCompany = Omit<Company, "id">;

export type ExtractedPosition = Omit<Position, "id">;

export type ExtractedProject = Omit<Project, "id">;

export type ExtractedEducation = Omit<Education, "id">;

/**
 * The parsed resume data, as returned by the LLM.
 */
export interface ParsedResumeData {
  userId?: string;
  user: {
    name: string;
    displayEmail: string;
    location: string;
    title: string;
  };
  skills: Skill[];
  companies: {
    name: string;
    location: string | null;
    startDate: string;
    endDate: string | null;
    positions: {
      title: string;
      startDate: string;
      endDate: string | null;
      projects: {
        name: string;
        description: string | null;
      }[];
    }[];
  }[];
  education: {
    school: string;
    degree: string;
    dateAwarded: string;
  }[];
}

/**
 * The parsed resume data, as submitted to the database. Only the skill IDs need to be submitted,
 * as the skills are stored in the database.
 */
export type ParsedResumeDataSubmission = Omit<ParsedResumeData, "skills"> & {
  skillIds: string[];
};
