let assert = require("chai").assert;
import { getKeys } from "../";

let fail = "getKeys did not return";

describe("getKeys", () => {
  it("returns an empty array if there is no arg", () => {
    assert.isArray(getKeys(), `${fail} an array`);
    assert.isEmpty(getKeys(), `${fail} an empty array`);
  });
  it("returns an empty array if arg is not an object", () => {
    assert.isArray(getKeys("string"), `${fail} an array`);
    assert.isEmpty(getKeys("string"), `${fail} an empty array`);
    assert.isArray(getKeys([]), `${fail} an array`);
    assert.isEmpty(getKeys([]), `${fail} an empty array`);
  });
  it("returns an empty array if arg has no properties", () => {
    assert.isArray(getKeys({}), `${fail} an array`);
    assert.isEmpty(getKeys({}), `${fail} an empty array`);
  });
  it("returns key array if arg is an object with at least one prop", () => {
    assert.isArray(getKeys({ prop: "val" }), `${fail} an array`);
    assert.equal(
      getKeys({ prop: "val" })[0],
      "prop",
      `${fail} an array with matching element for arg object's prop`
    );
    assert.equal(
      getKeys({ prop: "val" }).length,
      1,
      `${fail} an array with with length equal to amt of arg's props`
    );
  });
  it("returns key array with each key if arg is an object with props", () => {
    assert.equal(
      getKeys({ prop1: 1, prop2: 2, prop3: 3 })[0],
      "prop1",
      `${fail} an array with matching element at index 0`
    );
    assert.equal(
      getKeys({ prop1: 1, prop2: 2, prop3: 3 })[1],
      "prop2",
      `${fail} an array with matching element at index 1`
    );
    assert.equal(
      getKeys({ prop1: 1, prop2: 2, prop3: 3 })[2],
      "prop3",
      `${fail} an array with matching element at index 2`
    );
    assert.equal(
      getKeys({ prop1: 1, prop2: 2, prop3: 3 }).length,
      3,
      `${fail} an array with with length equal to amt of arg's props`
    );
  });
});
