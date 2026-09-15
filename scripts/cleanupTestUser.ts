/**
 * This script is used to cleanup Cypress test user data from the database. Run this via
 * `npm run cypress:cleanup` prior to running Cypress tests, to help ensure that there
 * is no conflicting orphan data left over from previous test runs. There's no need to run
 * this every time, but rather only when you encounter issues with the test runs due to
 * data issues.
 */

import { exit } from "process";
import { isCypressMagicLinkEmail } from "@/lib/cypressTestAccount";
import { prisma } from "@/lib/prisma";

const localTestEmail = process.env.CYPRESS_TEST_EMAIL || "test@ampdresume.com";

const users = await prisma.user.findMany({
  where: {
    OR: [
      { email: localTestEmail },
      {
        AND: [{ email: { startsWith: "cypress-" } }, { email: { endsWith: "@ampdresume.com" } }],
      },
    ],
  },
  select: { id: true, email: true },
});

const testUsers = users.filter((user) => user.email != null && isCypressMagicLinkEmail(user.email));

if (testUsers.length === 0) {
  console.log("No Cypress test users found.");
  await prisma.$disconnect();
  exit(0);
}

for (const user of testUsers) {
  console.log(`Deleting Cypress test user ${user.email} (${user.id})`);
  await prisma.user.delete({ where: { id: user.id } });
}

console.log(`Deleted ${testUsers.length} Cypress test user(s).`);
await prisma.$disconnect();
exit(0);
