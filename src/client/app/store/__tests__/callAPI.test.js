const assert = require("chai").assert;
import { callAPI_piRest } from "../";

const fail = "callAPI did not return";
const acct = 1;
const typeCompound = "compound";
const typeSingle = "single";
const view = "view";
let tables = {};

let socket = {};
socket.events = []
socket.emit = (event, data) => {
  return { event, data };
};

describe("callAPI", () => {
  it("calls socket.emit if type is not 'compound'", () => {
    assert.equal(callAPI_piRest());
  });
});
