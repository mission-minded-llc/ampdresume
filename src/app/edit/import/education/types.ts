export interface Education {
  school: string;
  degree: string;
  dateAwarded: string;
}

export interface EducationFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface EducationDateFieldProps {
  value: string;
  onChange: (date: string) => void;
  hasError: boolean;
}

export interface EducationFieldsProps {
  education: Education;
  index: number;
  onFieldChange: (index: number, field: string, value: string) => void;
  onDateChange: (index: number, date: string) => void;
  onDelete: (index: number) => void;
}

export interface ExtractedEducationProps {
  education: Education[];
  updateEducation: (education: Education[]) => void;
}
