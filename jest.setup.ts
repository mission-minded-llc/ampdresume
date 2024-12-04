import "@testing-library/jest-dom";
import { Request, Response } from "@whatwg-node/fetch";

// Polyfill global Request if not available
if (typeof globalThis.Request === "undefined") {
  globalThis.Request = Request;
}

// Polyfill global Response if not available
if (typeof globalThis.Response === "undefined") {
  globalThis.Response = Response;
}
