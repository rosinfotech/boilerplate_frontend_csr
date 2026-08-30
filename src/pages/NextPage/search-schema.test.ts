import { describe, expect, it } from "vitest";
import { nextPageSearchSchema } from "./search-schema";

describe("nextPageSearchSchema", () => {
    it("parses numeric page from string query value", () => {
        expect(nextPageSearchSchema.parse({ page: "2" })).toEqual({ page: 2 });
    });

    it("keeps numeric page as is", () => {
        expect(nextPageSearchSchema.parse({ page: 3 })).toEqual({ page: 3 });
    });

    it("defaults to page 1 when param is missing", () => {
        expect(nextPageSearchSchema.parse({})).toEqual({ page: 1 });
    });

    it("falls back to page 1 on invalid values", () => {
        expect(nextPageSearchSchema.parse({ page: "abc" })).toEqual({ page: 1 });
        expect(nextPageSearchSchema.parse({ page: 0 })).toEqual({ page: 1 });
        expect(nextPageSearchSchema.parse({ page: -5 })).toEqual({ page: 1 });
        expect(nextPageSearchSchema.parse({ page: 1.5 })).toEqual({ page: 1 });
    });
});
