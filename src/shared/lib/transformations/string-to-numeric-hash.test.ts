import { describe, expectTypeOf, it } from "vitest";
import { stringToNumericHash } from "./string-to-numeric-hash";

describe("utils", () => {
    describe("stringToNumericHash", () => {
        it("should be number", () => {
            expectTypeOf(stringToNumericHash("abc")).toBeNumber();
        });
        it("should be number", () => {
            expectTypeOf(stringToNumericHash("~♥~٩À𝙣À𝕟À𝐬۶~♥~")).toBeNumber();
        });
    });
});
