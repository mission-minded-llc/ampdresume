import "@testing-library/jest-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import Page from "./page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  getSession: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

describe("Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly for unauthenticated users", async () => {
    (getSession as jest.Mock).mockResolvedValue(null);

    const { getByText } = render(await Page());

    await waitFor(() => {
      expect(getByText("You need to be signed in to access this page.")).toBeInTheDocument();
    });
  });

  it("renders correctly for authenticated users", async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { id: "user-id" } } });
    (useQuery as jest.Mock).mockReturnValue({ isPending: false, data: [] });
    (useMutation as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (useQueryClient as jest.Mock).mockReturnValue({ invalidateQueries: jest.fn() });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    (getSession as jest.Mock).mockResolvedValue({
      user: { id: "user-id" },
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      name: "John Doe",
      slug: "john-doe",
      displayEmail: "john@example.com",
      title: "Software Engineer",
      location: "San Francisco, CA",
      siteTitle: "John's Resume",
      siteDescription: "This is John's resume.",
      siteImage: "https://example.com/image.png",
    });

    const { container, getByLabelText } = render(await Page());

    await waitFor(() => {
      expect(getByLabelText("Full Name")).toHaveValue("John Doe");
      expect(getByLabelText("Display Email")).toHaveValue("john@example.com");
      expect(getByLabelText("Title")).toHaveValue("Software Engineer");
      expect(getByLabelText("Location")).toHaveValue("San Francisco, CA");
      expect(getByLabelText("Site Title")).toHaveValue("John's Resume");
      expect(getByLabelText("Site Description")).toHaveValue("This is John's resume.");
      expect(getByLabelText("Image URL")).toHaveValue("https://example.com/image.png");
    });

    expect(container).toMatchSnapshot();
  });
});
