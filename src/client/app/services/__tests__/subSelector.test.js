let assert = require("chai").assert;
import { subSelector } from "../";

let fail = "subSelector did not return";

describe("subSelector", () => {
  it('returns "hidden" if selector is "hidden"', () => {
    assert.equal(
      subSelector("hidden", "string"),
      "hidden",
      `${fail} 'hidden' when selector is 'hidden'`
    );
  });
  it('returns "selector_element" when selector is not "hidden"', () => {
    subSelector("string1", "string2"),
      "string1_string2",
      `${fail} 'string1_string2' when selector is not 'hidden': 'string1'`;
  });
});
