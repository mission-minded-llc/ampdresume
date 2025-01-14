import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { handleAssetRequest } from "@/middleware/validateAssetRequest";
import { objectExists } from "@/lib/s3";

jest.mock("next-auth", () => ({ getServerSession: jest.fn() }));
jest.mock("@/lib/s3", () => ({ objectExists: jest.fn() }));

describe("handleAssetRequest", () => {
  const mockAction = jest.fn();
  const mockSession = { user: { id: "user123" } };
  const bucketUrl = `https://${process.env.AWS_S3_BUCKET_NAME}/`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if user is unauthorized", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    const req = new NextRequest(new Request("https://example.com"));
    const res = await handleAssetRequest(req, mockAction);

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  it("should return 400 if no body in request", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);

    const req = new NextRequest(new Request("https://example.com"));
    const res = await handleAssetRequest(req, mockAction);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "No body" });
  });

  it("should return 400 if src is missing", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);

    const req = new NextRequest(new Request("https://example.com"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    });
    const res = await handleAssetRequest(req, mockAction);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "src is required" });
  });

  it("should return 400 if src is not an absolute URL", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);

    const req = new NextRequest(new Request("https://example.com"), {
      body: JSON.stringify({ src: "relative/path" }),
    });
    const res = await handleAssetRequest(req, mockAction);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "src must be an absolute URL" });
  });

  it("should return 400 if src does not start with bucket URL", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);

    const req = new NextRequest(new Request("https://example.com"), {
      body: JSON.stringify({ src: "https://wrong-bucket/path" }),
    });
    const res = await handleAssetRequest(req, mockAction);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "src must be an absolute URL to the user's asset" });
  });

  it("should return 401 if user is unauthorized based on src", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);

    const req = new NextRequest(new Request("https://example.com"), {
      body: JSON.stringify({ src: `${bucketUrl}other-user/path` }),
    });
    const res = await handleAssetRequest(req, mockAction);

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  it("should return 404 if file does not exist", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    (objectExists as jest.Mock).mockResolvedValue(false);

    const req = new NextRequest(new Request("https://example.com"), {
      body: JSON.stringify({ src: `${bucketUrl}assets/user/user123/path` }),
    });
    const res = await handleAssetRequest(req, mockAction);

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "File not found" });
  });

  it("should call action with decoded src path", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    (objectExists as jest.Mock).mockResolvedValue(true);

    const req = new NextRequest(new Request("https://example.com"), {
      body: JSON.stringify({ src: `${bucketUrl}assets/user/user123/path` }),
    });
    const res = await handleAssetRequest(req, mockAction);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, path: "assets/user/user123/path" });
    expect(mockAction).toHaveBeenCalledWith("assets/user/user123/path");
  });
});
