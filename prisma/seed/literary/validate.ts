import { LITERARY_SKILLS } from "./skills";
import type { LiteraryCharacter } from "./types";

const catalogNames = new Set(LITERARY_SKILLS.map((skill) => skill.name));

export function validateLiteraryCharacter(character: LiteraryCharacter): string[] {
  const errors: string[] = [];
  const userSkillNames = new Set(character.skills.map((skill) => skill.name));

  for (const skill of character.skills) {
    if (!catalogNames.has(skill.name)) {
      errors.push(`${character.slug}: skill "${skill.name}" is not in the literary skill catalog`);
    }
  }

  const referenced: Array<{ where: string; name: string }> = [];

  for (const company of character.companies) {
    for (const position of company.positions) {
      if (position.startDate < company.startDate) {
        errors.push(
          `${character.slug}: position "${position.title}" starts before company "${company.name}"`,
        );
      }
      if (company.endDate && position.endDate && position.endDate > company.endDate) {
        errors.push(
          `${character.slug}: position "${position.title}" ends after company "${company.name}"`,
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

  for (const project of character.featuredProjects) {
    for (const name of project.skills ?? []) {
      referenced.push({ where: `featured project "${project.name}"`, name });
    }
  }

  for (const ref of referenced) {
    if (!userSkillNames.has(ref.name)) {
      errors.push(
        `${character.slug}: ${ref.where} references skill "${ref.name}" that is not on the resume`,
      );
    }
  }

  return errors;
}
