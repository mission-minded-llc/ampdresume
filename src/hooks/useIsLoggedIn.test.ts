import { renderHook } from "@testing-library/react";
import { useSession } from "next-auth/react";

import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";

// Mock the useSession hook
jest.mock("next-auth/react");

describe("useIsLoggedIn", () => {
  it("should return true if user is logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "John Doe" } },
    });

    const { result } = renderHook(() => useIsLoggedIn());
    expect(result.current).toBe(true);
  });

  it("should return false if user is not logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
    });

    const { result } = renderHook(() => useIsLoggedIn());
    expect(result.current).toBe(false);
  });
});
