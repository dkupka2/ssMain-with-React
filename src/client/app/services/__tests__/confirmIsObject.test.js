let assert = require('chai').assert;
import { confirmIsObject } from '../';

let emptyObject = {};

describe('confirmIsObject', () => {
  it('returns false if typeof arg is not object', () => {
    assert.isFalse(confirmIsObject(' '), `returns false if arg is string: ' '`);
    assert.isFalse(
      confirmIsObject(x => x),
      `returns false if arg is fn: (x) => x`
    );
    assert.isFalse(confirmIsObject(1), `returns false if arg is number: 1`);
  });
  it('returns false if arg is an array', () => {
    assert.isFalse(confirmIsObject([]), `returns is an empty array: []`);
    assert.isFalse(
      confirmIsObject([1, 2, 3]),
      `returns is an array with elements: [1,2,3]`
    );
  });
  it('returns false if arg is any other keyed object', () => {
    assert.isFalse(
      confirmIsObject(new Set([1, 2, 3])),
      `returns false if arg is a set: [1,2,3]`
    );
    assert.isFalse(
      confirmIsObject(new Map()),
      `returns false if arg is a map: ()`
    );
  });
  it('returns false if arg == undefined', () => {
    assert.isFalse(
      confirmIsObject(undefined),
      `returns false if arg is undefined`
    );
    assert.isFalse(confirmIsObject(null), `returns false if arg is null`);
  });
  it('returns true if arg is an object literal', () => {
    assert.isTrue(
      confirmIsObject(emptyObject),
      `returns true if arg is empty object`
    );
    assert.isTrue(
      confirmIsObject({ prop1: 'val1', prop2: 'val2' }),
      `returns true if arg is object with props`
    );
  });
});
