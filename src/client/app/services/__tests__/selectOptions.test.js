import React from "react";

let assert = require("chai").assert;
import { selectOptions } from "../";

let fail = "selectOptions did not return";

let mock = el => (
  <option key={el.toString()} value={el}>
    {el}
  </option>
);

describe("selectOptions", () => {
  it("returns an array if arg is array with string elements", () => {
    assert.isArray(selectOptions(["one", "two", "three"]), `${fail} array`);
  });
  it("returns an array with an element for each elem in arg array", () => {
    let arg = [1, 2, 3];
    assert.equal(
      selectOptions(arg).length,
      arg.length,
      `${fail} an array with same length as arg array`
    );
  });
  it("returns an array with a matching element", () => {
    assert.deepEqual(
      selectOptions(["string"])[0],
      [mock("string")][0],
      `${fail} array with matching element`
    );
  });
  it("returns a matching array when arg has multiple elements", () => {
    assert.deepEqual(
      selectOptions(["one", "two", "three"]),
      [mock("one"), mock("two"), mock("three")],
      `${fail} a matching array when arg has multiple elemments`
    );
  });
});
