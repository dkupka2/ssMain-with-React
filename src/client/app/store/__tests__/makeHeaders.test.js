const assert = require("chai").assert;
import { makeHeaders } from "../";

const fail = "makeHeaders did not return";

const a = "a";
const b = "b";
const c = "c";

const mockStructure = { a: 1, b: 2, c: 3 };
const mockArray = [1, 2, 3];
const mockCB = () => null;
const returnsA = a => a;
const returnsB = (a, b) => b;
const returnsC = (a, b, c) => c;

describe("makeHeaders", () => {
  it("returns a function", () => {
    assert.isFunction(makeHeaders(), `${fail} an array`);
  });
  it("returns a fn that iterates over the array (arg1)", () => {
    assert.equal(
      makeHeaders(mockStructure)(mockCB).length,
      3,
      `${fail} a new array with length equal to original array`
    );
  });
  it("returns a fn that returns an array of objects", () => {
    assert.isObject(
      makeHeaders(mockStructure)(mockCB)[0],
      `${fail} a new array of objects (el 1)`
    );
    assert.isObject(
      makeHeaders(mockStructure)(mockCB)[1],
      `${fail} a new array of objects (el 2)`
    );
    assert.isObject(
      makeHeaders(mockStructure)(mockCB)[2],
      `${fail} a new array of objects (el 3)`
    );
  });
  it("returns an array of objects with expected property values", () => {
    assert.equal(
      makeHeaders(mockStructure)(mockCB)[0].Header,
      a,
      `${fail} a new array objects with expected Header value`
    );
    assert.equal(
      makeHeaders(mockStructure)(mockCB)[0].accessor,
      a,
      `${fail} a new array objects with expected accessor value`
    );
    assert.equal(
      makeHeaders(mockStructure)(mockCB)[0].id,
      a,
      `${fail} a new array objects with expected id value`
    );
    assert.isFalse(
      makeHeaders(mockStructure)(mockCB)[0].filterAll,
      false,
      `${fail} a new array objects with expected filterAll value`
    );
  });
  it("returns a fn that returns an arr of objects with method: filterMethod", () => {
    assert.isFunction(
      makeHeaders(mockStructure)(mockCB)[0].filterMethod,
      `${fail} a nested object with exected method (el 1)`
    );
    assert.isFunction(
      makeHeaders(mockStructure)(mockCB)[1].filterMethod,
      `${fail} a nested object with exected method (el 2)`
    );
    assert.isFunction(
      makeHeaders(mockStructure)(mockCB)[2].filterMethod,
      `${fail} a nested object with exected method (el 3)`
    );
  });
  it("returns a nested method that utilizes arguments as expected", () => {
    assert.equal(
      makeHeaders(mockStructure)(returnsA)[0].filterMethod("test"),
      "test",
      `${fail} a nested method that utilizes (arg1) as expected`
    );
    assert.equal(
      makeHeaders(mockStructure)(returnsB)[0].filterMethod(null, "test"),
      "test",
      `${fail} a nested method that utilizes (arg2) as expected`
    );
    assert.equal(
      makeHeaders(mockStructure)(returnsC)[0].filterMethod(null, null),
      a,
      `${fail} a nested method that returns the column value`
    );
  });
  it("returns an empty array when structure argument is empty", () => {
    assert.isArray(
      makeHeaders({})(mockCB),
      `${fail} an array when passed an empty object`
    );
    assert.isEmpty(
      makeHeaders({})(mockCB),
      `${fail} an empty array when passed an empty object`
    );
  });
});
