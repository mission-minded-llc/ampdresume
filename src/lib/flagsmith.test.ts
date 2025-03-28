import { HasFeatureOptions } from "flagsmith";
import { checkFeatureFlag } from "./flagsmith";
import flagsmith from "flagsmith/isomorphic";

jest.mock("flagsmith/isomorphic", () => ({
  __esModule: true,
  default: {
    init: jest.fn().mockResolvedValue(undefined),
    hasFeature: jest.fn(),
    getValue: jest.fn(),
  },
}));

jest.mock("next-auth", () => ({
  __esModule: true,
  NextAuthOptions: jest.fn(),
  getServerSession: jest.fn(),
}));

describe("checkFeatureFlag", () => {
  const mockEnvId = "test-env-id";

  beforeEach(() => {
    process.env.FLAGSMITH_ENVIRONMENT_ID = mockEnvId;
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.FLAGSMITH_ENVIRONMENT_ID;
  });

  it("should initialize flagsmith with the correct environment ID", async () => {
    await checkFeatureFlag("test-flag");

    expect(flagsmith.init).toHaveBeenCalledWith({
      environmentID: mockEnvId,
    });
  });

  it("should call hasFeature with the flag name", async () => {
    await checkFeatureFlag("test-flag");

    expect(flagsmith.getValue).toHaveBeenCalledWith("test-flag");
    expect(flagsmith.hasFeature).toHaveBeenCalledWith("test-flag", undefined);
  });

  it("should pass identity to hasFeature when provided", async () => {
    const options: HasFeatureOptions = { fallback: true };
    await checkFeatureFlag("test-flag", options);

    expect(flagsmith.getValue).toHaveBeenCalledWith("test-flag");
    expect(flagsmith.hasFeature).toHaveBeenCalledWith("test-flag", options);
  });

  it("should return the result from hasFeature", async () => {
    (flagsmith.getValue as jest.Mock).mockReturnValue("test-value");
    (flagsmith.hasFeature as jest.Mock).mockReturnValue(true);

    const result = await checkFeatureFlag("test-flag");

    expect(result).toStrictEqual({ enabled: true, value: "test-value" });
  });

  it("should use empty string as fallback if environment ID is not set", async () => {
    delete process.env.FLAGSMITH_ENVIRONMENT_ID;

    await checkFeatureFlag("test-flag");

    expect(flagsmith.init).toHaveBeenCalledWith({
      environmentID: "",
    });
  });
});
