jest.unmock("@/lib/revalidatePublicResume");

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("@sentry/nextjs", () => ({
  captureException: jest.fn(),
}));

import { revalidatePath, revalidateTag } from "next/cache";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/prisma";
import { publicResumeDataCacheTag } from "@/lib/publicResumeDataCacheTag";
import {
  revalidatePublicResumeBySlug,
  revalidatePublicResumeForUserId,
} from "@/lib/revalidatePublicResume";
import { expect, describe, it } from "@jest/globals";

describe("revalidatePublicResume", () => {
  const slug = "taylor-everglow";
  const tag = publicResumeDataCacheTag(slug);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("revalidatePublicResumeBySlug", () => {
    it("does nothing when slug is missing", () => {
      revalidatePublicResumeBySlug(null);
      revalidatePublicResumeBySlug(undefined);
      revalidatePublicResumeBySlug("");

      expect(revalidatePath).not.toHaveBeenCalled();
      expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("revalidates the public resume routes and cache tag", () => {
      revalidatePublicResumeBySlug(slug);

      expect(revalidatePath).toHaveBeenCalledWith(`/r/${slug}`);
      expect(revalidatePath).toHaveBeenCalledWith(`/r/${slug}/pdf`);
      expect(revalidateTag).toHaveBeenCalledWith(tag, { expire: 0 });
    });

    it("reports errors to Sentry without throwing", () => {
      const error = new Error("revalidate failed");
      (revalidatePath as jest.Mock).mockImplementationOnce(() => {
        throw error;
      });
      const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

      expect(() => revalidatePublicResumeBySlug(slug)).not.toThrow();
      expect(Sentry.captureException).toHaveBeenCalledWith(error);
      expect(consoleError).toHaveBeenCalled();

      consoleError.mockRestore();
    });
  });

  describe("revalidatePublicResumeForUserId", () => {
    it("looks up the user slug and revalidates", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ slug });

      await revalidatePublicResumeForUserId("user-1");

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: "user-1" },
        select: { slug: true },
      });
      expect(revalidatePath).toHaveBeenCalledWith(`/r/${slug}`);
    });

    it("skips path revalidation when the user has no slug", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ slug: null });

      await revalidatePublicResumeForUserId("user-1");

      expect(revalidatePath).not.toHaveBeenCalled();
    });
  });
});
