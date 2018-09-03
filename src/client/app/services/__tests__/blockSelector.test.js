let assert = require("chai").assert;
import { blockSelector } from "../";

let fail = "blockSelector did not return";

describe("blockSelector", () => {
  it("returns (arg2) when (arg1) is true", () => {
    assert.equal(
      blockSelector(true, "string", false, ""),
      "string",
      `${fail} (arg2) when (arg1) is true`
    );
  });
  it("returns (arg2) when (arg1) and (arg3) are both true", () => {
    assert.equal(
      blockSelector(true, "string", true, ""),
      "string",
      `${fail} (arg2) when (arg1) & arg(3) are both true`
    );
  });
  it("returns (arg4) if (arg3) is true and (arg1) is not true", () => {
    assert.equal(
      blockSelector(false, "", true, "string"),
      "string",
      `${fail} (arg4) when (arg3) is true and arg(1) is not true`
    );
  });
  it('retuns "hidden" when (arg1) and (arg3) are not true', () => {
    assert.equal(
      blockSelector(false, "", false, ""),
      "hidden",
      `${fail} 'hidden' when (arg1) and (arg3) are not true`
    );
  });
});
