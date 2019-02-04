let assert = require('chai').assert;
import { isObj } from '../';

let emptyObject = {};

describe('isObj', () => {
  it('returns false if typeof arg is not object', () => {
    assert.isFalse(isObj(' '), `returns false if arg is string: ' '`);
    assert.isFalse(isObj(x => x), `returns false if arg is fn: (x) => x`);
    assert.isFalse(isObj(1), `returns false if arg is number: 1`);
  });
  it('returns false if arg is an array', () => {
    assert.isFalse(isObj([]), `returns is an empty array: []`);
    assert.isFalse(
      isObj([1, 2, 3]),
      `returns is an array with elements: [1,2,3]`
    );
  });
  it('returns false if arg is any other keyed object', () => {
    assert.isFalse(
      isObj(new Set([1, 2, 3])),
      `returns false if arg is a set: [1,2,3]`
    );
    assert.isFalse(isObj(new Map()), `returns false if arg is a map: ()`);
  });
  it('returns false if arg == undefined', () => {
    assert.isFalse(isObj(undefined), `returns false if arg is undefined`);
    assert.isFalse(isObj(null), `returns false if arg is null`);
  });
  it('returns true if arg is an object literal', () => {
    assert.isTrue(isObj(emptyObject), `returns true if arg is empty object`);
    assert.isTrue(
      isObj({ prop1: 'val1', prop2: 'val2' }),
      `returns true if arg is object with props`
    );
  });
});
