const assert = require("chai").assert;
import { initAcct } from "../";
import { isTruthy } from "../../services";

const fail = "initAcct did not return";
const testArray = ["a", "b", "c"];
let result = initAcct(testArray);

describe("initAcct", () => {
  it("iterates over the entire array adding a new key for each element", () => {
    assert.equal(
      Object.keys(result).length,
      3,
      `${fail} an object with a key for each array element`
    );
  });
  it("returns an object with a matching key value for each element", () => {
    assert.isTrue(
      Object.keys(result).includes("a") &&
        Object.keys(result).includes("b") &&
        Object.keys(result).includes("c"),
      `${fail} an object with a unique key for each element in the argument array`
    );
  });
  it("returns an object with an empty array for each element", () => {
    // element 1
    assert.isArray(
      result.a,
      `${fail} an object with value of an array for arguments array (el 1)`
    );
    assert.isEmpty(
      result.a,
      `${fail} an object with value of an empty array for arguments array (el 1)`
    );
    // element 2
    assert.isArray(
      result.b,
      `${fail} an object with value of an array for arguments array (el 2)`
    );
    assert.isEmpty(
      result.b,
      `${fail} an object with value of an empty array for arguments array (el 2)`
    );
    // element 3
    assert.isArray(
      result.c,
      `${fail} an object with value of an array for arguments array (el 3)`
    );
    assert.isEmpty(
      result.c,
      `${fail} an object with value of an empty array for arguments array (el 3)`
    );
  });
});
