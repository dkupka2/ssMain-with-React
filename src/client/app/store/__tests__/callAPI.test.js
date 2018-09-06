const assert = require("chai").assert;
import { callAPI_piRest } from "../";

const fail = "callAPI did not return";

let acct, type, view;
let tables = {};
let socket = {
  events: [],
  emit(event, data) {
    socket.events = [...socket.events, { event, data }];
    return socket.events;
  }
};

describe("callAPI - single table tests", () => {
  beforeEach(() => {
    acct = 1;
    type = "single";
    view = "view";
    tables = {
      requestKeys: {
        single: "request key"
      },
      single: {
        view: "view name"
      }
    };
    callAPI_piRest(acct)(type)(view)(tables)(socket);
  });
  afterEach(() => {
    socket.events = [];
  });
  it("calls emit once if type is not 'compound'", () => {
    assert.equal(
      socket.events.length,
      1,
      `${fail} a single-table request event`
    );
  });
  it("emits a single-table request event with expected props/vals", () => {
    assert.equal(
      socket.events[0].data.acct,
      1,
      `${fail} a single-table request event with expected acct value`
    );
    assert.equal(
      socket.events[0].data.table,
      "view name",
      `${fail} a single-table request event with expected table value`
    );
    assert.equal(
      socket.events[0].event,
      "request key",
      `${fail} a single-table request event with expected event value`
    );
  });
});

describe("callAPI - compound table tests", () => {
  beforeEach(() => {
    acct = 1;
    type = "compound";
    view = "test";
    tables = {
      requestKeys: {
        local: "REQUEST_LOCAL",
        global: "REQUEST_GLOBAL"
      },
      compound: {
        test: {
          local: ["localOne", "localTwo"],
          global: ["globalOne"]
        },
        control: {
          local: [" "]
        }
      }
    };
    callAPI_piRest(acct)(type)(view)(tables)(socket);
  });
  afterEach(() => {
    socket.events = [];
  });
  it("calls emit for each doc in the selected compound view", () => {
    assert.equal(
      socket.events.length,
      3,
      `${fail} a compound table request with the right number of events`
    );
  });
  // it("emits a request event for each table with expected props/vals", () => {

  // })
});
