import { VERTICAL_SKILLS } from "./skills";
import { VERTICAL_IDS, type VerticalProfile } from "./types";

const catalogNames = new Set(VERTICAL_SKILLS.map((skill) => skill.name));

export function validateVerticalProfile(profile: VerticalProfile): string[] {
  const errors: string[] = [];
  const userSkillNames = new Set(profile.skills.map((skill) => skill.name));

  if (!profile.name.trim()) errors.push(`${profile.slug}: missing name`);
  if (!profile.title.trim()) errors.push(`${profile.slug}: missing title`);
  if (!profile.location.trim()) errors.push(`${profile.slug}: missing location`);
  if (!profile.displayEmail?.trim()) errors.push(`${profile.slug}: missing display email`);
  if (!profile.summary.trim()) errors.push(`${profile.slug}: missing professional summary`);
  if (profile.socials.length > 0) {
    errors.push(`${profile.slug}: demo profiles must omit socials`);
  }
  if (profile.skills.length === 0) errors.push(`${profile.slug}: missing skills`);
  if (profile.companies.length === 0) errors.push(`${profile.slug}: missing experience`);
  if (profile.education.length === 0) errors.push(`${profile.slug}: missing education`);
  if (profile.certifications.length === 0) errors.push(`${profile.slug}: missing certifications`);
  if (profile.featuredProjects.length === 0) {
    errors.push(`${profile.slug}: missing featured projects`);
  }

  const projectCount = profile.companies.reduce(
    (total, company) =>
      total + company.positions.reduce((count, position) => count + position.projects.length, 0),
    0,
  );
  if (projectCount === 0) errors.push(`${profile.slug}: missing experience projects`);

  for (const skill of profile.skills) {
    if (!catalogNames.has(skill.name)) {
      errors.push(`${profile.slug}: skill "${skill.name}" is not in the vertical skill catalog`);
    }
  }

  const referenced: Array<{ where: string; name: string }> = [];

  for (const company of profile.companies) {
    for (const position of company.positions) {
      if (position.startDate < company.startDate) {
        errors.push(
          `${profile.slug}: position "${position.title}" starts before company "${company.name}"`,
        );
      }
      if (company.endDate && position.endDate && position.endDate > company.endDate) {
        errors.push(
          `${profile.slug}: position "${position.title}" ends after company "${company.name}"`,
        );
      }
      for (const project of position.projects) {
        for (const name of project.skills ?? []) {
          referenced.push({
            where: `project "${project.name}" at ${company.name}`,
            name,
          });
        }
      }
    }
  }

  for (const project of profile.featuredProjects) {
    for (const name of project.skills ?? []) {
      referenced.push({ where: `featured project "${project.name}"`, name });
    }
  }

  for (const ref of referenced) {
    if (!userSkillNames.has(ref.name)) {
      errors.push(
        `${profile.slug}: ${ref.where} references skill "${ref.name}" that is not on the resume`,
      );
    }
  }

  return errors;
}

export function validateVerticalRoster(profiles: VerticalProfile[]): string[] {
  const errors: string[] = [];
  const slugs = profiles.map((profile) => profile.slug);
  const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    errors.push(`Duplicate slugs: ${Array.from(new Set(duplicateSlugs)).join(", ")}`);
  }

  const names = profiles.map((profile) => profile.name);
  const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
  if (duplicateNames.length > 0) {
    errors.push(`Duplicate names: ${Array.from(new Set(duplicateNames)).join(", ")}`);
  }

  if (profiles.length !== VERTICAL_IDS.length * 4) {
    errors.push(`Expected ${VERTICAL_IDS.length * 4} profiles, found ${profiles.length}`);
  }

  for (const vertical of VERTICAL_IDS) {
    const group = profiles.filter((profile) => profile.vertical === vertical);
    if (group.length !== 4) {
      errors.push(`${vertical}: expected 4 profiles, found ${group.length}`);
      continue;
    }

    const women = group.filter((profile) => profile.gender === "woman").length;
    const men = group.filter((profile) => profile.gender === "man").length;
    if (women !== 2 || men !== 2) {
      errors.push(`${vertical}: expected 2 women and 2 men, found ${women} women and ${men} men`);
    }
  }

  return errors;
}
