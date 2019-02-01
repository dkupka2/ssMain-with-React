let assert = require("chai").assert;
import { isObj } from "../";

let fail = "isObj did not return";

let emptyObject = {}


describe("isObj", () => {
  it("returns false if typeof arg is not object", () => {
    assert.isFalse(isObj(" "), `${fail} false if arg is string: ' '`);
    assert.isFalse(isObj(x => x), `${fail} false if arg is fn: (x) => x`);
    assert.isFalse(isObj(1), `${fail} false if arg is number: 1`);
  });
  it("returns false if arg is an array", () => {
    assert.isFalse(isObj([]), `${fail} is an empty array: []`);
    assert.isFalse(
      isObj([1, 2, 3]),
      `${fail} is an array with elements: [1,2,3]`
    );
  });
  it("returns false if arg is any other keyed object", () => {
    assert.isFalse(
      isObj(new Set([1, 2, 3])),
      `${fail} false if arg is a set: [1,2,3]`
    );
    assert.isFalse(isObj(new Map()), `${fail} false if arg is a map: ()`);
  });
  it("returns false if arg == undefined", () => {
    assert.isFalse(isObj(undefined), `${fail} false if arg is undefined`);
    assert.isFalse(isObj(null), `${fail} false if arg is null`);
  });
  it("returns true if arg is an object literal", () => {
    assert.isTrue(isObj(emptyObject), `${fail} true if arg is empty object`);
    assert.isTrue(
      isObj({ prop1: "val1", prop2: "val2" }),
      `${fail} true if arg is object with props`
    );
  });
});
