import { prisma } from "@/lib/prisma";
import { sanitizeHtmlServer } from "@/lib/secureHtmlParser";
import { datesEqual, jsonEqual, numbersEqual, stringsEqual, toDate, toDateOrNull } from "./dates";
import type { LiteraryCharacter, SeedResumeProfile } from "./types";
import type { LiterarySkillDefinition } from "./skills";

export type SeedCounts = {
  created: number;
  updated: number;
  unchanged: number;
  removed: number;
};

export function emptyCounts(): SeedCounts {
  return { created: 0, updated: 0, unchanged: 0, removed: 0 };
}

export function addCounts(target: SeedCounts, source: SeedCounts) {
  target.created += source.created;
  target.updated += source.updated;
  target.unchanged += source.unchanged;
  target.removed += source.removed;
}

export function formatCounts(counts: SeedCounts): string {
  return `${counts.created} created, ${counts.updated} updated, ${counts.unchanged} unchanged, ${counts.removed} removed`;
}

function bump(counts: SeedCounts, action: keyof SeedCounts) {
  counts[action] += 1;
}

export async function upsertSkillCatalog(
  skills: LiterarySkillDefinition[],
  options: { updateExisting?: boolean } = {},
): Promise<SeedCounts> {
  const updateExisting = options.updateExisting ?? true;
  const counts = emptyCounts();

  for (const skill of skills) {
    const existing = await prisma.skill.findUnique({
      where: { name: skill.name },
    });

    if (!existing) {
      await prisma.skill.create({
        data: {
          name: skill.name,
          icon: skill.icon,
          published: true,
          publishDate: new Date(),
        },
      });
      bump(counts, "created");
      continue;
    }

    if (!updateExisting) {
      bump(counts, "unchanged");
      continue;
    }

    if (stringsEqual(existing.icon, skill.icon) && existing.published) {
      bump(counts, "unchanged");
      continue;
    }

    await prisma.skill.update({
      where: { id: existing.id },
      data: {
        icon: skill.icon,
        published: true,
        publishDate: existing.publishDate ?? new Date(),
      },
    });
    bump(counts, "updated");
  }

  return counts;
}

export async function upsertLiterarySkills(skills: LiterarySkillDefinition[]): Promise<SeedCounts> {
  return upsertSkillCatalog(skills);
}

async function upsertUser(character: SeedResumeProfile): Promise<{
  id: string;
  counts: SeedCounts;
}> {
  const counts = emptyCounts();
  const desired = {
    email: null,
    name: character.name,
    slug: character.slug,
    displayEmail: character.displayEmail ?? null,
    location: character.location,
    siteTitle: character.siteTitle,
    title: character.title,
    siteDescription: character.siteDescription,
    summary: character.summary,
    summaryTitle: character.summaryTitle ?? null,
    isDemo: character.isDemo,
  };

  const existing = await prisma.user.findFirst({
    where: { slug: character.slug },
  });

  if (!existing) {
    const created = await prisma.user.create({
      data: {
        ...desired,
        emailVerified: new Date(),
      },
    });
    bump(counts, "created");
    return { id: created.id, counts };
  }

  const unchanged =
    stringsEqual(existing.email, desired.email) &&
    stringsEqual(existing.name, desired.name) &&
    stringsEqual(existing.slug, desired.slug) &&
    stringsEqual(existing.displayEmail, desired.displayEmail) &&
    stringsEqual(existing.location, desired.location) &&
    stringsEqual(existing.siteTitle, desired.siteTitle) &&
    stringsEqual(existing.title, desired.title) &&
    stringsEqual(existing.siteDescription, desired.siteDescription) &&
    stringsEqual(existing.summary, desired.summary) &&
    stringsEqual(existing.summaryTitle, desired.summaryTitle) &&
    existing.isDemo === desired.isDemo;

  if (unchanged) {
    bump(counts, "unchanged");
    return { id: existing.id, counts };
  }

  const updated = await prisma.user.update({
    where: { id: existing.id },
    data: desired,
  });
  bump(counts, "updated");
  return { id: updated.id, counts };
}

async function syncSocials(
  userId: string,
  socials: LiteraryCharacter["socials"],
): Promise<SeedCounts> {
  const counts = emptyCounts();
  const existing = await prisma.social.findMany({ where: { userId } });
  const keepIds = new Set<string>();

  for (const [sortIndex, social] of socials.entries()) {
    const match = existing.find(
      (row) => row.platform === social.platform && row.ref === social.ref,
    );

    if (match) {
      keepIds.add(match.id);
      if (match.sortIndex !== sortIndex) {
        await prisma.social.update({
          where: { id: match.id },
          data: { sortIndex },
        });
        bump(counts, "updated");
      } else {
        bump(counts, "unchanged");
      }
      continue;
    }

    const samePlatform = existing.find(
      (row) => row.platform === social.platform && !keepIds.has(row.id),
    );

    if (samePlatform) {
      await prisma.social.update({
        where: { id: samePlatform.id },
        data: { ref: social.ref, sortIndex },
      });
      keepIds.add(samePlatform.id);
      bump(counts, "updated");
      continue;
    }

    const created = await prisma.social.create({
      data: { userId, platform: social.platform, ref: social.ref, sortIndex },
    });
    keepIds.add(created.id);
    bump(counts, "created");
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.social.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return counts;
}

async function syncEducation(
  userId: string,
  education: LiteraryCharacter["education"],
): Promise<SeedCounts> {
  const counts = emptyCounts();
  const existing = await prisma.education.findMany({ where: { userId } });
  const keepIds = new Set<string>();

  for (const entry of education) {
    const dateAwarded = toDateOrNull(entry.dateAwarded);
    const match = existing.find(
      (row) => row.school === entry.school && row.degree === entry.degree && !keepIds.has(row.id),
    );

    if (!match) {
      const created = await prisma.education.create({
        data: {
          userId,
          school: entry.school,
          degree: entry.degree,
          dateAwarded,
        },
      });
      keepIds.add(created.id);
      bump(counts, "created");
      continue;
    }

    keepIds.add(match.id);

    if (datesEqual(match.dateAwarded, dateAwarded)) {
      bump(counts, "unchanged");
      continue;
    }

    await prisma.education.update({
      where: { id: match.id },
      data: { dateAwarded },
    });
    bump(counts, "updated");
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.education.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return counts;
}

async function syncCertifications(
  userId: string,
  certifications: LiteraryCharacter["certifications"],
): Promise<SeedCounts> {
  const counts = emptyCounts();
  const existing = await prisma.certification.findMany({ where: { userId } });
  const keepIds = new Set<string>();

  for (const entry of certifications) {
    const dateAwarded = toDate(entry.dateAwarded);
    const match = existing.find(
      (row) => row.name === entry.name && row.issuer === entry.issuer && !keepIds.has(row.id),
    );

    if (!match) {
      const created = await prisma.certification.create({
        data: {
          userId,
          name: entry.name,
          issuer: entry.issuer,
          dateAwarded,
          credentialUrl: entry.credentialUrl ?? null,
          credentialId: entry.credentialId ?? null,
        },
      });
      keepIds.add(created.id);
      bump(counts, "created");
      continue;
    }

    keepIds.add(match.id);

    const unchanged =
      datesEqual(match.dateAwarded, dateAwarded) &&
      stringsEqual(match.credentialUrl, entry.credentialUrl) &&
      stringsEqual(match.credentialId, entry.credentialId);

    if (unchanged) {
      bump(counts, "unchanged");
      continue;
    }

    await prisma.certification.update({
      where: { id: match.id },
      data: {
        dateAwarded,
        credentialUrl: entry.credentialUrl ?? null,
        credentialId: entry.credentialId ?? null,
      },
    });
    bump(counts, "updated");
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.certification.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return counts;
}

async function syncSkillsForUser(
  userId: string,
  skills: LiteraryCharacter["skills"],
): Promise<{ skillForUserByName: Map<string, string>; counts: SeedCounts }> {
  const counts = emptyCounts();
  const skillForUserByName = new Map<string, string>();
  const existing = await prisma.skillForUser.findMany({
    where: { userId },
    include: { skill: { select: { name: true } } },
  });
  const keepIds = new Set<string>();

  for (const skill of skills) {
    const parent = await prisma.skill.findUnique({ where: { name: skill.name } });
    if (!parent) {
      throw new Error(`Seed skill "${skill.name}" is missing from the Skill catalog.`);
    }

    const match = existing.find((row) => row.skillId === parent.id);

    if (!match) {
      const created = await prisma.skillForUser.create({
        data: {
          userId,
          skillId: parent.id,
          description: skill.description,
          yearStarted: skill.yearStarted ?? null,
          totalYears: skill.totalYears ?? null,
        },
      });
      skillForUserByName.set(skill.name, created.id);
      keepIds.add(created.id);
      bump(counts, "created");
      continue;
    }

    skillForUserByName.set(skill.name, match.id);
    keepIds.add(match.id);

    const unchanged =
      stringsEqual(match.description, skill.description) &&
      numbersEqual(match.yearStarted, skill.yearStarted) &&
      numbersEqual(match.totalYears, skill.totalYears);

    if (unchanged) {
      bump(counts, "unchanged");
      continue;
    }

    await prisma.skillForUser.update({
      where: { id: match.id },
      data: {
        description: skill.description,
        yearStarted: skill.yearStarted ?? null,
        totalYears: skill.totalYears ?? null,
      },
    });
    bump(counts, "updated");
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.skillForUser.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return { skillForUserByName, counts };
}

async function syncProjectSkills(
  projectId: string,
  skillNames: string[] | undefined,
  skillForUserByName: Map<string, string>,
): Promise<SeedCounts> {
  const counts = emptyCounts();
  const desiredNames = skillNames ?? [];
  const existing = await prisma.skillForProject.findMany({
    where: { projectId },
    include: { skillForUser: { include: { skill: { select: { name: true } } } } },
  });
  const keepIds = new Set<string>();

  for (const name of desiredNames) {
    const skillForUserId = skillForUserByName.get(name);
    if (!skillForUserId) {
      throw new Error(`Project skill "${name}" is not on this resume.`);
    }

    const match = existing.find((row) => row.skillForUserId === skillForUserId);
    if (match) {
      keepIds.add(match.id);
      bump(counts, "unchanged");
      continue;
    }

    const created = await prisma.skillForProject.create({
      data: { projectId, skillForUserId },
    });
    keepIds.add(created.id);
    bump(counts, "created");
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.skillForProject.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return counts;
}

async function syncProjects(
  positionId: string,
  projects: LiteraryCharacter["companies"][number]["positions"][number]["projects"],
  skillForUserByName: Map<string, string>,
): Promise<SeedCounts> {
  const counts = emptyCounts();
  const existing = await prisma.project.findMany({ where: { positionId } });
  const keepIds = new Set<string>();

  for (const [index, project] of projects.entries()) {
    const match = existing.find((row) => row.name === project.name && !keepIds.has(row.id));

    if (!match) {
      const created = await prisma.project.create({
        data: {
          positionId,
          name: project.name,
          description: project.description,
          sortIndex: index,
        },
      });
      keepIds.add(created.id);
      bump(counts, "created");
      addCounts(counts, await syncProjectSkills(created.id, project.skills, skillForUserByName));
      continue;
    }

    keepIds.add(match.id);

    const unchanged =
      stringsEqual(match.description, project.description) && match.sortIndex === index;

    if (unchanged) {
      bump(counts, "unchanged");
    } else {
      await prisma.project.update({
        where: { id: match.id },
        data: {
          description: project.description,
          sortIndex: index,
        },
      });
      bump(counts, "updated");
    }

    addCounts(counts, await syncProjectSkills(match.id, project.skills, skillForUserByName));
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.project.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return counts;
}

async function syncPositions(
  companyId: string,
  positions: LiteraryCharacter["companies"][number]["positions"],
  skillForUserByName: Map<string, string>,
): Promise<SeedCounts> {
  const counts = emptyCounts();
  const existing = await prisma.position.findMany({ where: { companyId } });
  const keepIds = new Set<string>();

  for (const position of positions) {
    const startDate = toDate(position.startDate);
    const endDate = toDateOrNull(position.endDate);
    const match = existing.find(
      (row) =>
        row.title === position.title &&
        datesEqual(row.startDate, startDate) &&
        !keepIds.has(row.id),
    );

    if (!match) {
      const created = await prisma.position.create({
        data: {
          companyId,
          title: position.title,
          startDate,
          endDate,
        },
      });
      keepIds.add(created.id);
      bump(counts, "created");
      addCounts(counts, await syncProjects(created.id, position.projects, skillForUserByName));
      continue;
    }

    keepIds.add(match.id);

    if (datesEqual(match.endDate, endDate)) {
      bump(counts, "unchanged");
    } else {
      await prisma.position.update({
        where: { id: match.id },
        data: { endDate },
      });
      bump(counts, "updated");
    }

    addCounts(counts, await syncProjects(match.id, position.projects, skillForUserByName));
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.position.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return counts;
}

async function syncCompanies(
  userId: string,
  companies: LiteraryCharacter["companies"],
  skillForUserByName: Map<string, string>,
): Promise<SeedCounts> {
  const counts = emptyCounts();
  const existing = await prisma.company.findMany({ where: { userId } });
  const keepIds = new Set<string>();

  for (const company of companies) {
    const startDate = toDate(company.startDate);
    const endDate = toDateOrNull(company.endDate);
    const match = existing.find((row) => row.name === company.name && !keepIds.has(row.id));

    if (!match) {
      const created = await prisma.company.create({
        data: {
          userId,
          name: company.name,
          description: company.description ?? null,
          location: company.location,
          startDate,
          endDate,
        },
      });
      keepIds.add(created.id);
      bump(counts, "created");
      addCounts(counts, await syncPositions(created.id, company.positions, skillForUserByName));
      continue;
    }

    keepIds.add(match.id);

    const unchanged =
      stringsEqual(match.description, company.description) &&
      stringsEqual(match.location, company.location) &&
      datesEqual(match.startDate, startDate) &&
      datesEqual(match.endDate, endDate);

    if (unchanged) {
      bump(counts, "unchanged");
    } else {
      await prisma.company.update({
        where: { id: match.id },
        data: {
          description: company.description ?? null,
          location: company.location,
          startDate,
          endDate,
        },
      });
      bump(counts, "updated");
    }

    addCounts(counts, await syncPositions(match.id, company.positions, skillForUserByName));
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.company.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return counts;
}

async function syncFeaturedProjectSkills(
  featuredProjectId: string,
  skillNames: string[] | undefined,
  skillForUserByName: Map<string, string>,
): Promise<SeedCounts> {
  const counts = emptyCounts();
  const desiredNames = skillNames ?? [];
  const existing = await prisma.skillForFeaturedProject.findMany({
    where: { featuredProjectId },
  });
  const keepIds = new Set<string>();

  for (const name of desiredNames) {
    const skillForUserId = skillForUserByName.get(name);
    if (!skillForUserId) {
      throw new Error(`Featured project skill "${name}" is not on this resume.`);
    }

    const match = existing.find((row) => row.skillForUserId === skillForUserId);
    if (match) {
      keepIds.add(match.id);
      bump(counts, "unchanged");
      continue;
    }

    const created = await prisma.skillForFeaturedProject.create({
      data: { featuredProjectId, skillForUserId },
    });
    keepIds.add(created.id);
    bump(counts, "created");
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.skillForFeaturedProject.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return counts;
}

async function syncFeaturedProjects(
  userId: string,
  featuredProjects: LiteraryCharacter["featuredProjects"],
  skillForUserByName: Map<string, string>,
): Promise<SeedCounts> {
  const counts = emptyCounts();
  const existing = await prisma.featuredProject.findMany({ where: { userId } });
  const keepIds = new Set<string>();

  for (const project of featuredProjects) {
    const description = await sanitizeHtmlServer(project.description);
    const links = project.links ?? [];
    const match = existing.find((row) => row.name === project.name && !keepIds.has(row.id));

    if (!match) {
      const created = await prisma.featuredProject.create({
        data: {
          userId,
          name: project.name,
          description,
          links: links as unknown as object,
        },
      });
      keepIds.add(created.id);
      bump(counts, "created");
      addCounts(
        counts,
        await syncFeaturedProjectSkills(created.id, project.skills, skillForUserByName),
      );
      continue;
    }

    keepIds.add(match.id);

    const unchanged =
      stringsEqual(match.description, description) && jsonEqual(match.links, links);

    if (unchanged) {
      bump(counts, "unchanged");
    } else {
      await prisma.featuredProject.update({
        where: { id: match.id },
        data: {
          description,
          links: links as unknown as object,
        },
      });
      bump(counts, "updated");
    }

    addCounts(
      counts,
      await syncFeaturedProjectSkills(match.id, project.skills, skillForUserByName),
    );
  }

  for (const row of existing) {
    if (!keepIds.has(row.id)) {
      await prisma.featuredProject.delete({ where: { id: row.id } });
      bump(counts, "removed");
    }
  }

  return counts;
}

export async function upsertResumeProfile(profile: SeedResumeProfile): Promise<SeedCounts> {
  const totals = emptyCounts();

  const user = await upsertUser(profile);
  addCounts(totals, user.counts);

  addCounts(totals, await syncSocials(user.id, profile.socials));
  addCounts(totals, await syncEducation(user.id, profile.education));
  addCounts(totals, await syncCertifications(user.id, profile.certifications));

  const skills = await syncSkillsForUser(user.id, profile.skills);
  addCounts(totals, skills.counts);

  addCounts(totals, await syncCompanies(user.id, profile.companies, skills.skillForUserByName));
  addCounts(
    totals,
    await syncFeaturedProjects(user.id, profile.featuredProjects, skills.skillForUserByName),
  );

  return totals;
}

export async function upsertLiteraryCharacter(character: LiteraryCharacter): Promise<SeedCounts> {
  return upsertResumeProfile(character);
}
