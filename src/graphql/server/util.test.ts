import type { User } from "@prisma/client";
import { expect } from "@jest/globals";
import { GraphQLContext } from "@/types/graphql";
import { filterUserData } from "./util";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

const mockUser = {
  id: "user-1",
  name: "Jane Doe",
  email: "secret@example.com",
  displayEmail: "public@example.com",
  location: "NYC",
  title: "Engineer",
  siteTitle: "Jane",
  siteDescription: "Bio",
  summary: "<p>Public summary</p>",
  summaryTitle: "About Me",
  webThemeName: "default",
} as User;

const unauthenticatedContext: GraphQLContext = {
  isAuthenticated: false,
  session: null,
  userId: undefined,
};

const ownerContext: GraphQLContext = {
  isAuthenticated: true,
  session: { user: { id: "user-1" } } as GraphQLContext["session"],
  userId: "user-1",
};

const otherUserContext: GraphQLContext = {
  isAuthenticated: true,
  session: { user: { id: "other-user" } } as GraphQLContext["session"],
  userId: "other-user",
};

describe("filterUserData", () => {
  it("returns null when user is null", () => {
    expect(filterUserData(null, unauthenticatedContext)).toBeNull();
  });

  it("strips emails for unauthenticated users", () => {
    expect(filterUserData(mockUser, unauthenticatedContext)).toMatchObject({
      id: "user-1",
      name: "Jane Doe",
      summary: "<p>Public summary</p>",
      summaryTitle: "About Me",
      displayEmail: null,
      email: null,
    });
  });

  it("strips emails when the viewer is not the owner", () => {
    const result = filterUserData(mockUser, otherUserContext);

    expect(result).toMatchObject({
      displayEmail: null,
      email: null,
    });
  });

  it("returns full user data for the owner", () => {
    expect(filterUserData(mockUser, ownerContext)).toBe(mockUser);
  });
});
