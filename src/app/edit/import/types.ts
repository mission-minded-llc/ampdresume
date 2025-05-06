import { Company, Education, Position, Project, Skill, User } from "@openresume/theme";

export interface PDFFile extends File {
  arrayBuffer: () => Promise<ArrayBuffer>;
}

export interface TextItem {
  str: string;
  hasEOL: boolean;
  transform: number[];
  width: number;
  height: number;
  fontName: string;
}

export interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList };
}

export type ExtractedUser = Omit<User, "id"> & {
  email: string;
};
export type ExtractedCompany = Omit<Company, "id">;
export type ExtractedPosition = Omit<Position, "id">;
export type ExtractedProject = Omit<Project, "id">;
export type ExtractedEducation = Omit<Education, "id">;

export interface ParsedResumeData {
  userId?: string;
  user: {
    name: string;
    email: string;
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
