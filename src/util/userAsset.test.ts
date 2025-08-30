import { deleteUserAsset, manageUserAsset, undeleteUserAsset, uploadUserAsset } from "./userAsset";
import { expect, describe, it } from "@jest/globals";

global.fetch = jest.fn();

describe("userAsset utilities", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe("uploadUserAsset", () => {
    it("uploads a file and returns the URL on success", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ url: "https://example.com/my-file.png" }),
      });

      const file = new File(["test"], "test.png", { type: "image/png" });
      const result = await uploadUserAsset(file);

      expect(global.fetch).toHaveBeenCalledWith("/api/user-asset/upload", expect.any(Object));
      expect(result.status).toBe(200);
      expect(result.url).toBe("https://example.com/my-file.png");
    });

    it("returns an error if the upload fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: "Upload failed" }),
      });

      const file = new File(["test"], "test.png", { type: "image/png" });
      const result = await uploadUserAsset(file);

      expect(result.status).toBe(400);
      expect(result.error).toBe("Upload failed");
    });
  });

  describe("manageUserAsset", () => {
    it("calls fetch with correct parameters on success", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await manageUserAsset("https://example.com/my-file.png", "delete");
      expect(global.fetch).toHaveBeenCalledWith("/api/user-asset/delete", {
        method: "POST",
        body: JSON.stringify({ src: "https://example.com/my-file.png" }),
        headers: { "Content-Type": "application/json" },
      });
    });

    it("throws an error on failure", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: "Not found" }),
      });

      await expect(manageUserAsset("missing-file.png", "delete")).rejects.toThrow(
        "Error (400): Not found",
      );
    });
  });

  describe("deleteUserAsset", () => {
    it("calls manageUserAsset with 'delete'", async () => {
      const spy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      await deleteUserAsset("file.png");
      expect(spy).toHaveBeenCalledWith("/api/user-asset/delete", expect.any(Object));
    });
  });

  describe("undeleteUserAsset", () => {
    it("calls manageUserAsset with 'undelete'", async () => {
      const spy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      await undeleteUserAsset("file.png");
      expect(spy).toHaveBeenCalledWith("/api/user-asset/undelete", expect.any(Object));
    });
  });
});
