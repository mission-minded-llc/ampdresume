import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

describe("Prisma Client", () => {
  it("should create a PrismaClient instance", () => {
    expect(prisma).toBeInstanceOf(PrismaClient);
  });

  it("should reuse the PrismaClient instance in development", () => {
    const globalForPrisma = global as unknown as { prisma: PrismaClient };
    expect(globalForPrisma.prisma).toBe(prisma);
  });
});
