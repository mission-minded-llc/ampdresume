import { Company, Education } from "@openresume/theme";

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

export interface ParsedResumeData {
  user: {
    name: string;
    email: string;
    location: string;
    title: string;
  };
  skills: string[];
  socialUrls: string[];
  companies: Company[];
  education: Education[];
}
