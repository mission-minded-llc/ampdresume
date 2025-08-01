import {
  CopyObjectCommand,
  HeadObjectCommand,
  NotFound,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { flagForDeletion, objectExists, revertFlagForDeletion, uploadObject } from "./s3";

jest.mock("@aws-sdk/client-s3", () => {
  return {
    S3Client: jest.fn(),
    HeadObjectCommand: jest.fn(),
    PutObjectCommand: jest.fn(),
    CopyObjectCommand: jest.fn(),
    NotFound: class {},
  };
});

describe("s3 utility functions", () => {
  const sendMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (S3Client as jest.Mock).mockReturnValue({
      send: sendMock,
    });
    process.env.AWS_S3_BUCKET_NAME = "test-bucket";
    process.env.AWS_S3_USER_ACCESS_KEY_ID = "test-access-key";
    process.env.AWS_S3_USER_SECRET_ACCESS_KEY = "test-secret-key";
    process.env.AWS_REGION = "us-east-1";
  });

  describe("objectExists", () => {
    it("returns true when the object is found", async () => {
      sendMock.mockResolvedValueOnce({});
      const exists = await objectExists("some-key");
      expect(exists).toBe(true);
      expect(sendMock).toHaveBeenCalledWith(expect.any(HeadObjectCommand));
    });

    it("returns false when the object is not found", async () => {
      // Simulate a NotFound error
      sendMock.mockRejectedValueOnce(new NotFound({ message: "Object not found", $metadata: {} }));
      const exists = await objectExists("missing-key");
      expect(exists).toBe(false);
    });

    it("re-throws errors that aren't NotFound", async () => {
      sendMock.mockRejectedValueOnce(new Error("Some other error"));
      await expect(objectExists("bad-key")).rejects.toThrow("Some other error");
    });
  });

  describe("uploadObject", () => {
    it("uploads an object successfully", async () => {
      sendMock.mockResolvedValueOnce({});
      const data = Buffer.from("test-content");
      await uploadObject("test-key", data, "image/png");
      expect(sendMock).toHaveBeenCalledWith(expect.any(PutObjectCommand));
    });
  });

  describe("flagForDeletion & revertFlagForDeletion", () => {
    it("sets delete metadata to true", async () => {
      sendMock.mockResolvedValueOnce({});
      await flagForDeletion("file-to-delete");
      expect(sendMock).toHaveBeenCalledWith(expect.any(CopyObjectCommand));
    });

    it("sets delete metadata to false", async () => {
      sendMock.mockResolvedValueOnce({});
      await revertFlagForDeletion("file-to-undelete");
      expect(sendMock).toHaveBeenCalledWith(expect.any(CopyObjectCommand));
    });
  });
});
