import { findUserByNormalizedEmail, normalizeEmail } from "@/util/email";

import { prisma } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}));

describe("normalizeEmail", () => {
  it("should normalize email by removing dots and anything after +", () => {
    const email = "test.email+1234@test.com";
    const normalized = normalizeEmail(email);
    expect(normalized).toBe("testemail@test.com");
  });

  it("should convert email to lowercase", () => {
    const email = "Test.Email+1234@Test.Com";
    const normalized = normalizeEmail(email);
    expect(normalized).toBe("testemail@test.com");
  });
});

describe("findUserByNormalizedEmail", () => {
  const mockUsers = [{ email: "test.email@test.com" }, { email: "another.email@test.com" }];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should find user by normalized email", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const email = "test.email+1234@test.com";
    const user = await findUserByNormalizedEmail(email);

    expect(prisma.user.findMany).toHaveBeenCalledWith({
      where: { email: { endsWith: "@test.com" } },
    });
    expect(user).toEqual({ email: "test.email@test.com" });
  });

  it("should return null if no user is found", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

    const email = "nonexistent@test.com";
    const user = await findUserByNormalizedEmail(email);

    expect(prisma.user.findMany).toHaveBeenCalledWith({
      where: { email: { endsWith: "@test.com" } },
    });
    expect(user).toBeUndefined();
  });
});
