import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const testUserEmails = ["john@openresume.org", "jane@openresume.org"];

export const testUsers = [
  {
    email: "john@openresume.org",
    name: "John Doe",
    slug: "john-doe",
    displayEmail: "johnny.doe@openresume.org",
    location: "Los Angeles, CA",
    siteTitle: "John Doe's OpenResume",
    title: "Designer",
  },
  {
    email: "jane@openresume.org",
    name: "Jane Doe",
    slug: "jane-doe",
    displayEmail: "jane.doe@openresume.org",
    location: "New York, NY",
    siteTitle: "Jane Doe's OpenResume",
    title: "Senior Software Engineer",
  },
];

export const getTestUserIds = async () => {
  const testUserIds = [];

  for (const email of testUserEmails) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      testUserIds.push(user.id);
    }
  }

  return testUserIds;
};
