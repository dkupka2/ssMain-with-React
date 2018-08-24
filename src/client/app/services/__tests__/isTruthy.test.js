let assert = require("chai").assert;
import { isTruthy } from "../";

let fail = "isTruthy did not return";

describe("isTruthy", () => {
  it("returns true expression if condition is true", () => {
    assert.equal(
      isTruthy(true, "string", ""),
      "string",
      `${fail} true expression if condition is true`
    );
    assert.equal(
      isTruthy(" ", "string", ""),
      "string",
      `${fail} true expression if condition is truthy: ' '`
    );
  });
  it("returns false expression if condition is false", () => {
    assert.equal(
      isTruthy(false, "", "string"),
      "string",
      `${fail} false expression if condition is false`
    );
    assert.equal(
      isTruthy("", "", "string"),
      "string",
      `${fail} false expression if condition is falsey: ''`
    );
  });
  it("returns true if condition is true with no true expression", () => {
    assert.isTrue(
      isTruthy(true),
      `${fail} true when condition is true with no expression args`
    );
  });
  it("returns true if condition is false with no false expression", () => {
    assert.isFalse(
      isTruthy(false),
      `${fail} false when condition is false with no expression args`
    );
  });
});
