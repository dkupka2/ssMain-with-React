let assert = require("chai").assert;
import { isEmptyObject } from "../";

let fail = "isEmptyObject did not return";

describe("isEmptyObject", () => {
  it("returns false when there is no arg", () => {
    assert.isFalse(isEmptyObject(), `${fail} with no arg`);
  });
  it("returns false when the arg does not have type: object", () => {
    assert.isFalse(isEmptyObject(" "), `${fail} false when arg is ' '`);
    assert.isFalse(isEmptyObject(1), `${fail} false when arg is 1`);
    assert.isFalse(isEmptyObject(true), `${fail} false when arg is ' '`);
  });
  it("returns false when arg is non keyed object type", () => {
    assert.isFalse(isEmptyObject([1, 2]), `${fail} false when arg is an array`);
    assert.isFalse(
      isEmptyObject(new Set([1, 2, 3])),
      `${fail} false when arg is a set`
    );
  });
  it("returns false when arg is a keyed array", () => {
    let arg = [];
    arg.prop = "val"; // I don't know why anyone would do this...
    assert.isFalse(
      isEmptyObject(arg),
      `${fail} false when arg is a keyed array`
    );
  });
  it("returns false when arg is an object literal with props", () => {
    assert.isFalse(
      isEmptyObject({ prop1: "val1", prop2: "val2" }),
      `${fail} false when arg is an object literal with props`
    );
  });
  it("returns true when arg is an empty object literal", () => {
    assert.isTrue(
      isEmptyObject({}),
      `${fail} true when arg is an empty object literal`
    );
  });
});
