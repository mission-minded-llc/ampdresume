/**
 * This script is used to cleanup the test user data from the database. Run this via
 * `npm run cypress:cleanup` prior to running Cypress tests, to help ensure that there
 * is no conflicting orphan data left over from previous test runs. There's no need to run
 * this every time, but rather only when you encounter issues with the test runs due to
 * data issues.
 */

import { exit } from "process";
/* eslint-disable no-console */
import { prisma } from "@/lib/prisma";

// This is the test email used for Cypress.
const email = "test@ampdresume.com";

const user = await prisma.user.findFirst({
  where: { email },
  select: { id: true },
});

if (!user) {
  console.log(`No user found with email: ${email}`);
  prisma.$disconnect();
  exit(0);
}

console.log(`Cleaning up data for user with email: ${email} and id: ${user.id}`);

console.log(
  `Fetching company, position, project, and skillForUser IDs for user with email: ${email}`,
);
const companyIds = await prisma.company.findMany({
  where: { userId: user.id },
  select: { id: true },
});

const positionIds = await prisma.position.findMany({
  where: { companyId: { in: companyIds.map((company) => company.id) } },
  select: { id: true },
});

const projectIds = await prisma.project.findMany({
  where: { positionId: { in: positionIds.map((position) => position.id) } },
  select: { id: true },
});

const skillForUserIds = await prisma.skillForUser.findMany({
  where: { userId: user.id },
  select: { id: true },
});

console.log(
  `Found ${companyIds.length} companies, ${positionIds.length} positions, ${projectIds.length} projects, and ${skillForUserIds.length} skills for user with email: ${email}`,
);

console.log(`Deleting ${skillForUserIds.length} skills for user with email: ${email}`);
await prisma.skillForUser
  .deleteMany({
    where: { userId: user.id },
  })
  .then(() => {
    console.log(`Deleted all skills for user with email: ${email}`);
  })
  .catch((error) => {
    console.log(`Error cleaning up skills: ${error.message}`);
    prisma.$disconnect();
    exit(1);
  });

console.log(`Deleting ${projectIds.length} projects for user with email: ${email}`);
await prisma.project
  .deleteMany({
    where: { id: { in: projectIds.map((project) => project.id) } },
  })
  .then(() => {
    console.log(`Deleted all projects for user with email: ${email}`);
  })
  .catch((error) => {
    console.log(`Error cleaning up projects: ${error.message}`);
    prisma.$disconnect();
    exit(1);
  });

console.log(`Deleting ${positionIds.length} positions for user with email: ${email}`);
await prisma.position
  .deleteMany({
    where: { id: { in: positionIds.map((position) => position.id) } },
  })
  .then(() => {
    console.log(`Deleted all positions for user with email: ${email}`);
  })
  .catch((error) => {
    console.log(`Error cleaning up positions: ${error.message}`);
    prisma.$disconnect();
    exit(1);
  });

console.log(`Deleting ${companyIds.length} companies for user with email: ${email}`);
await prisma.company
  .deleteMany({
    where: { userId: user.id },
  })
  .then(() => {
    console.log(`Deleted all companies for user with email: ${email}`);
  })
  .catch((error) => {
    console.log(`Error cleaning up companies: ${error.message}`);
    prisma.$disconnect();
    exit(1);
  });

console.log(`Deleting user with email: ${email}`);
await prisma.user
  .delete({
    where: { id: user.id },
  })
  .then(() => {
    console.log(`Deleted all data for user with email: ${email}`);
  })
  .catch((error) => {
    console.log(`Error cleaning up user data: ${error.message}`);
    prisma.$disconnect();
    exit(1);
  });

console.log(`Data cleanup complete for user with email: ${email}`);
prisma.$disconnect();
exit(0);
