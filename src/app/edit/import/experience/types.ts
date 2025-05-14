export interface Project {
  name: string;
  description: string | null;
}

export interface Position {
  title: string;
  startDate: string;
  endDate: string | null;
  projects: Project[];
}

export interface Company {
  name: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  positions: Position[];
}
