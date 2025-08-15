import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { testUserEmails } from "./data";

const getIds = async (
  model: keyof Omit<
    PrismaClient,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
  >,
  filter: object,
  selectField = "id"
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = await (prisma[model] as any).findMany({
    where: filter,
    select: {
      [selectField]: true,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return results.map((result: any) => result[selectField]);
};

export const getTestUserIds = async () => {
  const testUserIds = [];
  for (const email of testUserEmails) {
    const userIds = await getIds("user", { email });
    if (userIds.length > 0) {
      testUserIds.push(userIds[0]);
    }
  }
  return testUserIds;
};

export const getTestCompanyIds = async () => {
  const testUserIds = await getTestUserIds();
  const testCompanyIds = [];
  for (const userId of testUserIds) {
    const companyIds = await getIds("company", { userId });
    testCompanyIds.push(...companyIds);
  }
  return testCompanyIds;
};

export const getTestPositionIds = async () => {
  const testCompanyIds = await getTestCompanyIds();
  const testPositionIds = [];
  for (const companyId of testCompanyIds) {
    const positionIds = await getIds("position", { companyId });
    testPositionIds.push(...positionIds);
  }
  return testPositionIds;
};

export const getTestProjectIds = async () => {
  const testPositionIds = await getTestPositionIds();
  const testProjectIds = [];
  for (const positionId of testPositionIds) {
    const projectIds = await getIds("project", { positionId });
    testProjectIds.push(...projectIds);
  }
  return testProjectIds;
};
