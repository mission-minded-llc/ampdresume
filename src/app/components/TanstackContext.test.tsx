import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useQueryClient } from "@tanstack/react-query";
import { TanstackQueryProvider } from "./TanstackContext";
import { expect } from "@jest/globals";

const QueryClientProbe = () => {
  const queryClient = useQueryClient();
  return <div data-testid="query-client">{queryClient ? "ready" : "missing"}</div>;
};

describe("TanstackQueryProvider", () => {
  it("provides a QueryClient to children", () => {
    render(
      <TanstackQueryProvider>
        <QueryClientProbe />
      </TanstackQueryProvider>,
    );

    expect(screen.getByTestId("query-client")).toHaveTextContent("ready");
  });
});
