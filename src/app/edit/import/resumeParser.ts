interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  website?: string;
}

interface Experience {
  company: string;
  title: string;
  duration: string;
  description: string[];
}

interface Education {
  institution: string;
  degree: string;
  duration: string;
  gpa?: string;
  details?: string[];
}

interface Project {
  name: string;
  description: string[];
  technologies?: string[];
}

export interface ParsedResume {
  contactInfo: ContactInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications?: string[];
  publications?: string[];
  awards?: string[];
}

/**
 * Parses resume text into structured sections
 * @param text - Raw text extracted from resume PDF
 * @returns Structured resume object
 */
function parseResume(text: string): ParsedResume {
  // Remove extra whitespace and normalize line breaks
  const cleanedText = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Initialize result object
  const result: ParsedResume = {
    contactInfo: {},
    experience: [],
    education: [],
    skills: [],
    projects: [],
  };

  // Split text into lines for processing
  const lines = cleanedText.split("\n");

  // Common section headers in resumes
  const sectionHeaders = {
    contact: /^\s*(contact|personal info|contact information|personal information)\s*$/i,
    summary: /^\s*(summary|profile|objective|professional summary|about me)\s*$/i,
    experience:
      /^\s*(experience|work experience|employment|professional experience|work history)\s*$/i,
    education: /^\s*(education|academic background|academic history|qualifications)\s*$/i,
    skills: /^\s*(skills|technical skills|competencies|expertise|proficiencies|core skills)\s*$/i,
    projects: /^\s*(projects|personal projects|portfolio|project experience)\s*$/i,
    certifications: /^\s*(certifications|certificates|accreditations)\s*$/i,
    publications: /^\s*(publications|papers|research|articles)\s*$/i,
    awards: /^\s*(awards|honors|achievements|recognitions)\s*$/i,
  };

  // Extract the name (usually the first line of the resume)
  if (lines.length > 0 && !Object.values(sectionHeaders).some((regex) => regex.test(lines[0]))) {
    result.contactInfo.name = lines[0].trim();
  }

  // Parse by identifying sections and their content
  let currentSection: string | null = null;
  let sectionContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) continue;

    // Check if this line is a section header
    let foundNewSection = false;
    for (const [section, regex] of Object.entries(sectionHeaders)) {
      if (regex.test(line)) {
        // Process previous section before moving to new one
        if (currentSection) {
          processSectionContent(result, currentSection, sectionContent);
        }
        currentSection = section;
        sectionContent = [];
        foundNewSection = true;
        break;
      }
    }

    if (foundNewSection) continue;

    // If not a section header, add to current section content
    if (currentSection) {
      sectionContent.push(line);
    } else {
      // If no section identified yet, assume it's contact info
      parseContactInfo(line, result.contactInfo);
    }
  }

  // Process the last section
  if (currentSection) {
    processSectionContent(result, currentSection, sectionContent);
  }

  return result;
}

/**
 * Process content based on the identified section
 */
function processSectionContent(result: ParsedResume, section: string, content: string[]): void {
  switch (section) {
    case "contact":
      content.forEach((line) => parseContactInfo(line, result.contactInfo));
      break;
    case "summary":
      result.summary = content.join(" ");
      break;
    case "experience":
      result.experience = parseExperienceSection(content);
      break;
    case "education":
      result.education = parseEducationSection(content);
      break;
    case "skills":
      result.skills = parseSkillsSection(content);
      break;
    case "projects":
      result.projects = parseProjectsSection(content);
      break;
    case "certifications":
      result.certifications = content;
      break;
    case "publications":
      result.publications = content;
      break;
    case "awards":
      result.awards = content;
      break;
  }
}

/**
 * Extract contact information from a line of text
 */
function parseContactInfo(line: string, contactInfo: ContactInfo): void {
  const emailMatch = line.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  const phoneMatch = line.match(/(?:\+\d{1,3}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = line.match(/linkedin\.com\/in\/[A-Za-z0-9_-]+/i);
  const websiteMatch = line.match(/(?:https?:\/\/)?(?:www\.)?([A-Za-z0-9-]+\.[A-Za-z0-9.-]+)/i);

  if (emailMatch) contactInfo.email = emailMatch[0];
  if (phoneMatch) contactInfo.phone = phoneMatch[0];
  if (linkedinMatch) contactInfo.linkedin = linkedinMatch[0];
  if (websiteMatch && !line.includes("linkedin")) contactInfo.website = websiteMatch[0];

  // If line contains location information (city, state, country)
  if (
    !emailMatch &&
    !phoneMatch &&
    !linkedinMatch &&
    (line.includes(",") || /[A-Z]{2}/.test(line))
  ) {
    contactInfo.location = line;
  }
}

/**
 * Parse experience section into structured format
 */
function parseExperienceSection(content: string[]): Experience[] {
  const experiences: Experience[] = [];
  let currentExp: Partial<Experience> = {};
  let descriptionLines: string[] = [];

  content.forEach((line, index) => {
    // Look for patterns that likely indicate a new job entry
    const companyTitleMatch = line.match(/(.+)\s*[|-]\s*(.+)/);
    const dateMatch = line.match(
      /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)[\s\w,]+(20\d\d|19\d\d)\s*(-|–|to)\s*(Present|Current|Now|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)[\s\w,]+(20\d\d|19\d\d))/i,
    );

    // If we find a date pattern, this might be a new experience entry
    if (
      (companyTitleMatch || dateMatch) &&
      (index === 0 || (line.length > 0 && content[index - 1].length === 0) || /^[A-Z]/.test(line))
    ) {
      // Save previous entry if it exists
      if (currentExp.company && currentExp.title) {
        experiences.push({
          company: currentExp.company,
          title: currentExp.title,
          duration: currentExp.duration || "",
          description: descriptionLines,
        });
      }

      // Start new entry
      currentExp = {};
      descriptionLines = [];

      if (companyTitleMatch) {
        currentExp.company = companyTitleMatch[1].trim();
        currentExp.title = companyTitleMatch[2].trim();
      } else {
        // If no company/title pattern, use the line as company and look for title in next line
        currentExp.company = line;
      }

      if (dateMatch) {
        currentExp.duration = dateMatch[0];
      }
    } else if (dateMatch && !currentExp.duration) {
      // Date on a separate line
      currentExp.duration = dateMatch[0];
    } else if (line.trim() && currentExp.company) {
      // If we're in an experience entry, add line to description
      if (!currentExp.title && line.includes(":")) {
        // This might be a job title
        currentExp.title = line.trim();
      } else {
        descriptionLines.push(line.trim());
      }
    }
  });

  // Add the last experience
  if (currentExp.company && currentExp.title) {
    experiences.push({
      company: currentExp.company,
      title: currentExp.title,
      duration: currentExp.duration || "",
      description: descriptionLines,
    });
  }

  return experiences;
}

/**
 * Parse education section into structured format
 */
function parseEducationSection(content: string[]): Education[] {
  const education: Education[] = [];
  let currentEdu: Partial<Education> = {};
  let detailLines: string[] = [];

  content.forEach((line, index) => {
    const degreeMatch = line.match(
      /(Bachelor|Master|PhD|B\.S\.|M\.S\.|B\.A\.|M\.A\.|M\.B\.A\.|Doctor)/i,
    );
    const dateMatch = line.match(
      /(20\d\d|19\d\d)\s*(-|–|to)\s*(Present|Current|Now|20\d\d|19\d\d)/i,
    );
    const gpaMatch = line.match(/GPA\s*:?\s*([\d.]+)/i);

    // New education entry usually starts with institution name
    if (
      (index === 0 ||
        (line.length > 0 && content[index - 1].length === 0) ||
        /^[A-Z]/.test(line)) &&
      (degreeMatch || dateMatch || /university|college|school|institute/i.test(line))
    ) {
      // Save previous entry if it exists
      if (currentEdu.institution && currentEdu.degree) {
        education.push({
          institution: currentEdu.institution,
          degree: currentEdu.degree,
          duration: currentEdu.duration || "",
          gpa: currentEdu.gpa,
          details: detailLines.length > 0 ? detailLines : undefined,
        });
      }

      // Start new entry
      currentEdu = {};
      detailLines = [];

      currentEdu.institution = line;

      if (dateMatch) {
        currentEdu.duration = dateMatch[0];
      }
    } else if (dateMatch && !currentEdu.duration) {
      // Date on a separate line
      currentEdu.duration = dateMatch[0];
    } else if (gpaMatch) {
      currentEdu.gpa = gpaMatch[0];
    } else if (line.trim() && currentEdu.institution) {
      // If we're in an education entry, add details
      if (!currentEdu.degree && degreeMatch) {
        currentEdu.degree = line.trim();
      } else {
        detailLines.push(line.trim());
      }
    }
  });

  // Add the last education entry
  if (currentEdu.institution && currentEdu.degree) {
    education.push({
      institution: currentEdu.institution,
      degree: currentEdu.degree,
      duration: currentEdu.duration || "",
      gpa: currentEdu.gpa,
      details: detailLines.length > 0 ? detailLines : undefined,
    });
  } else if (currentEdu.institution) {
    // If we have just the institution but no explicit degree
    education.push({
      institution: currentEdu.institution,
      degree: detailLines.length > 0 ? detailLines[0] : "Unknown Degree",
      duration: currentEdu.duration || "",
      details: detailLines.length > 1 ? detailLines.slice(1) : undefined,
    });
  }

  return education;
}

/**
 * Parse skills section into an array of skills
 */
function parseSkillsSection(content: string[]): string[] {
  let skills: string[] = [];

  content.forEach((line) => {
    // Handle skills listed with commas or bullets
    if (line.includes(",") || line.includes("•") || line.includes("·")) {
      const separators = /[,•·|]/;
      const lineSkills = line
        .split(separators)
        .map((s) => s.trim())
        .filter(Boolean);
      skills = skills.concat(lineSkills);
    } else if (line.trim()) {
      skills.push(line.trim());
    }
  });

  return skills;
}

/**
 * Parse projects section into structured format
 */
function parseProjectsSection(content: string[]): Project[] {
  const projects: Project[] = [];
  let currentProject: Partial<Project> = {};
  let descriptionLines: string[] = [];
  let techStack: string[] = [];

  content.forEach((line, index) => {
    // Project titles are often at the beginning of a paragraph or have special formatting
    if (
      index === 0 ||
      (line.length > 0 && content[index - 1].length === 0) ||
      (/^[A-Z]/.test(line) && !line.endsWith("."))
    ) {
      // Save previous project if it exists
      if (currentProject.name) {
        projects.push({
          name: currentProject.name,
          description: descriptionLines,
          technologies: techStack.length > 0 ? techStack : undefined,
        });
      }

      // Start new project
      currentProject = { name: line.trim() };
      descriptionLines = [];
      techStack = [];
    } else if (
      line.toLowerCase().includes("tech") ||
      line.toLowerCase().includes("stack") ||
      line.toLowerCase().includes("tools") ||
      line.toLowerCase().includes("technologies")
    ) {
      // This line likely contains technology information
      const techMatch = line.match(/tech(nologies|nology|stack|s)?:?\s*(.*)/i);
      if (techMatch && techMatch[2]) {
        techStack = techMatch[2]
          .split(/[,|]/)
          .map((t) => t.trim())
          .filter(Boolean);
      } else {
        descriptionLines.push(line.trim());
      }
    } else if (line.trim() && currentProject.name) {
      // Regular description line
      descriptionLines.push(line.trim());
    }
  });

  // Add the last project
  if (currentProject.name) {
    projects.push({
      name: currentProject.name,
      description: descriptionLines,
      technologies: techStack.length > 0 ? techStack : undefined,
    });
  }

  return projects;
}

// Example usage
// const resumeText = `...`; // Your PDF extracted text here
// const parsed = parseResume(resumeText);
// console.log(JSON.stringify(parsed, null, 2));

export { parseResume };
