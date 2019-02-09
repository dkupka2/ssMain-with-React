let assert = require('chai').assert;
import { checkIfEmptyObject } from '../';

describe('checkIfEmptyObject', () => {
  it('returns false when there is no arg', () => {
    assert.isFalse(checkIfEmptyObject(), `returns with no arg`);
  });
  it('returns false when the arg does not have type: object', () => {
    assert.isFalse(checkIfEmptyObject(' '), `returns false when arg is ' '`);
    assert.isFalse(checkIfEmptyObject(1), `returns false when arg is 1`);
    assert.isFalse(checkIfEmptyObject(true), `returns false when arg is ' '`);
  });
  it('returns false when arg is non keyed object type', () => {
    assert.isFalse(
      checkIfEmptyObject([1, 2]),
      `returns false when arg is an array`
    );
    assert.isFalse(
      checkIfEmptyObject(new Set([1, 2, 3])),
      `returns false when arg is a set`
    );
  });
  it('returns false when arg is a keyed array', () => {
    let arg = [];
    arg.prop = 'val'; // I don't know why anyone would do this...
    assert.isFalse(
      checkIfEmptyObject(arg),
      `returns false when arg is a keyed array`
    );
  });
  it('returns false when arg is an object literal with props', () => {
    assert.isFalse(
      checkIfEmptyObject({ prop1: 'val1', prop2: 'val2' }),
      `returns false when arg is an object literal with props`
    );
  });
  it('returns true when arg is an empty object literal', () => {
    assert.isTrue(
      checkIfEmptyObject({}),
      `returns true when arg is an empty object literal`
    );
  });
});
