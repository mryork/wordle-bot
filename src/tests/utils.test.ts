import { expect, test, describe, vi } from "vitest";
import transformInputState from "../utils/transform-input-state";

describe("Utils", () => {
  test("getApiResponse", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return {
        json: async () => {
          return { guess: "XXXXX" };
        },
        ok: true,
      };
    });

    const getApiResponse = (await import("../utils/get-api-response")).default;
    const response = await getApiResponse([], [], new AbortController());
    expect(response).toEqual({ guess: "XXXXX" });
  });

  test("getApiResponse error", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return {
        json: async () => {
          return { guess: "XXXXX" };
        },
        ok: false,
        text: async () => {
          return "Sample error";
        },
      };
    });

    const getApiResponse = (await import("../utils/get-api-response")).default;
    try {
      await getApiResponse([], [], new AbortController());
    } catch (error: any) {
      expect(error.message).toEqual("Sample error");
    }
  });

  test("getApiResponse abort", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return {
        json: async () => {
          return { guess: "XXXXX" };
        },
        ok: true,
      };
    });

    const getApiResponse = (await import("../utils/get-api-response")).default;
    const abortController = new AbortController();
    abortController.abort();
    try {
      await getApiResponse([], [], abortController);
    } catch (error: any) {
      expect(error.name).toEqual("AbortError");
    }
  });

  test("transformInput", async () => {
    expect(transformInputState([0, 0, 0, 0, 0])).toEqual("xxxxx");
    expect(transformInputState([1, 1, 1, 1, 1])).toEqual("ggggg");
    expect(transformInputState([2, 2, 2, 2, 2])).toEqual("yyyyy");
  });
});
