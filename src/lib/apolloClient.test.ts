import { ApolloClient } from "@apollo/client";
import { getApolloClient } from "@/lib/apolloClient";
import { expect } from "@jest/globals";

describe("getApolloClient", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
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
  });

  it("should create an ApolloClient instance with the correct URI", () => {
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT = "http://example.com/graphql";
    const client = getApolloClient();
    expect(client).toBeInstanceOf(ApolloClient);
    const httpLink = client.link;
    expect(httpLink).toHaveProperty("options.uri", "http://example.com/graphql");
  });
});
