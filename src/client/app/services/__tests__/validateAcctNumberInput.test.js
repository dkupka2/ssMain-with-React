let assert = require("chai").assert;
import { validateAcctNumberInput } from "..";

let fail = `validateAcctNumberInput did not return`;

describe("validateAcctNumberInput", () => {
  it("returns an empty string when arg has no valid characters", () => {
    assert.equal(
      validateAcctNumberInput(),
      "",
      `${fail} an empty string when arg is undefined`
    );
    assert.equal(
      validateAcctNumberInput("x"),
      "",
      `${fail} an empty string when arg is invalid character`
    );
  });
  it("returns a matching string: up to four numeric characters", () => {
    assert.equal(
      validateAcctNumberInput("1"),
      "1",
      `${fail} a matching string: '1'`
    );
    assert.equal(
      validateAcctNumberInput("12"),
      "12",
      `${fail} a matching string: '12'`
    );
    assert.equal(
      validateAcctNumberInput("123"),
      "123",
      `${fail} a matching string: '123'`
    );
    assert.equal(
      validateAcctNumberInput("1234"),
      "1234",
      `${fail} a matching string: '1234'`
    );
    assert.equal(
      validateAcctNumberInput("12345"),
      "1234",
      `${fail} a matching substring when length is beyond limit: 12345`
    );
  });
  it("returns a valid string without the last character if invalid", () => {
    assert.equal(
      validateAcctNumberInput("1x"),
      "1",
      `${fail} a matching string when last character is invalid: '1x'`
    );
    assert.equal(
      validateAcctNumberInput("12x"),
      "12",
      `${fail} a matching string when last character is invalid: '1x'`
    );
    assert.equal(
      validateAcctNumberInput("123x"),
      "123",
      `${fail} a matching string when last character is invalid: '1x'`
    );
    assert.equal(
      validateAcctNumberInput("1234x"),
      "1234",
      `${fail} a matching string when last character is invalid: '1x'`
    );
  });
});
