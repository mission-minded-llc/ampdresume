import { HasFeatureOptions } from "flagsmith";
import { checkFeatureFlag } from "./flagsmith";
import flagsmith from "flagsmith/isomorphic";

// Mock the flagsmith module
jest.mock("flagsmith/isomorphic", () => ({
  __esModule: true,
  default: {
    init: jest.fn().mockResolvedValue(undefined),
    hasFeature: jest.fn(),
  },
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

    expect(flagsmith.hasFeature).toHaveBeenCalledWith("test-flag", undefined);
  });

  it("should pass identity to hasFeature when provided", async () => {
    const options: HasFeatureOptions = { fallback: true };
    await checkFeatureFlag("test-flag", options);

    expect(flagsmith.hasFeature).toHaveBeenCalledWith("test-flag", options);
  });

  it("should return the result from hasFeature", async () => {
    // Mock the return value for this specific test
    (flagsmith.hasFeature as jest.Mock).mockReturnValue(true);

    const result = await checkFeatureFlag("test-flag");

    expect(result).toBe(true);
  });

  it("should use empty string as fallback if environment ID is not set", async () => {
    delete process.env.FLAGSMITH_ENVIRONMENT_ID;

    await checkFeatureFlag("test-flag");

    expect(flagsmith.init).toHaveBeenCalledWith({
      environmentID: "",
    });
  });
});
