import { ApolloClient } from "@apollo/client";
import { getApolloClient } from "@/lib/apolloClient";
import { expect } from "@jest/globals";
import { gql } from "@apollo/client";

describe("getApolloClient", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    // Reset the module to clear the singleton
    jest.resetModules();
    mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: {} }),
        headers: new Headers(),
        ok: true,
        redirected: false,
        status: 200,
        statusText: "OK",
        type: "basic",
        url: "",
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
        bytes: jest.fn(),
      } as Response),
    );
    global.fetch = mockFetch;
  });

  it("should create an ApolloClient instance with the correct URI", async () => {
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT = "http://example.com/graphql";
    const client = getApolloClient();
    expect(client).toBeInstanceOf(ApolloClient);

    // Test that the client uses the correct URI by making a query
    const TEST_QUERY = gql`
      query {
        __typename
      }
    `;

    // Force a network request by using fetchPolicy: 'network-only'
    try {
      await client.query({
        query: TEST_QUERY,
        fetchPolicy: "network-only",
      });
    } catch {
      // Ignore errors, we just want to verify the URI was used
    }

    // Verify fetch was called with the correct URI
    expect(mockFetch).toHaveBeenCalled();
    const fetchCall = mockFetch.mock.calls[0];
    expect(fetchCall[0]).toBe("http://example.com/graphql");
  });
});
