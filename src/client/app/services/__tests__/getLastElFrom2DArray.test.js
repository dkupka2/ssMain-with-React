let assert = require("chai").assert;
import { getLastElFrom2DArray } from "../";

let fail = "getLast did not return";

describe("getLastElFrom2DArray", () => {
  it("retuns an array if there is no arg", () => {
    assert.isArray(getLastElFrom2DArray(), `${fail} an array if there is no arg`);
  });
  it("returns an empty array if there is no arg", () => {
    assert.isEmpty(getLastElFrom2DArray(), `${fail} an array if there is no arg`);
  });
  it("returns the last element if arg contains one element", () => {
    assert.equal(getLastElFrom2DArray([1]), 1, `${fail} the only element`);
  });
  it("returns the last element if arg contains multiple elements", () => {
    assert.equal(getLastElFrom2DArray([1, 2]), 2, `${fail} the last element`);
  });
});
