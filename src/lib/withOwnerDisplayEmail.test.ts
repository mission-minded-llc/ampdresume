import type { Session } from "next-auth";
import { expect } from "@jest/globals";
import { prisma } from "@/lib/prisma";
import { User } from "@/types";
import { withOwnerDisplayEmail } from "./withOwnerDisplayEmail";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

const user: User = {
  id: "user-1",
  name: "Jane Doe",
  displayEmail: "leaked@example.com",
  location: "NYC",
  title: "Engineer",
};

describe("withOwnerDisplayEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("strips displayEmail for unauthenticated viewers", async () => {
    await expect(withOwnerDisplayEmail(user, null)).resolves.toEqual({
      ...user,
      displayEmail: null,
    });
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("strips displayEmail when the viewer does not own the resume", async () => {
    const session = { user: { id: "other-user" } } as Session;

    await expect(withOwnerDisplayEmail(user, session)).resolves.toEqual({
      ...user,
      displayEmail: null,
    });
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("loads displayEmail when the viewer owns the resume", async () => {
    const session = { user: { id: "user-1" } } as Session;
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      displayEmail: "owner@example.com",
    });

    await expect(withOwnerDisplayEmail(user, session)).resolves.toEqual({
      ...user,
      displayEmail: "owner@example.com",
    });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "user-1" },
      select: { displayEmail: true },
    });
  });

  it("keeps displayEmail null when the owner has not set one", async () => {
    const session = { user: { id: "user-1" } } as Session;
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      displayEmail: null,
    });

    await expect(withOwnerDisplayEmail(user, session)).resolves.toEqual({
      ...user,
      displayEmail: null,
    });
  });
});
