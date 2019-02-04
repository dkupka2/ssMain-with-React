let assert = require('chai').assert;
import { isEmptyObject } from '../';

describe('isEmptyObject', () => {
  it('returns false when there is no arg', () => {
    assert.isFalse(isEmptyObject(), `returns with no arg`);
  });
  it('returns false when the arg does not have type: object', () => {
    assert.isFalse(isEmptyObject(' '), `returns false when arg is ' '`);
    assert.isFalse(isEmptyObject(1), `returns false when arg is 1`);
    assert.isFalse(isEmptyObject(true), `returns false when arg is ' '`);
  });
  it('returns false when arg is non keyed object type', () => {
    assert.isFalse(isEmptyObject([1, 2]), `returns false when arg is an array`);
    assert.isFalse(
      isEmptyObject(new Set([1, 2, 3])),
      `returns false when arg is a set`
    );
  });
  it('returns false when arg is a keyed array', () => {
    let arg = [];
    arg.prop = 'val'; // I don't know why anyone would do this...
    assert.isFalse(
      isEmptyObject(arg),
      `returns false when arg is a keyed array`
    );
  });
  it('returns false when arg is an object literal with props', () => {
    assert.isFalse(
      isEmptyObject({ prop1: 'val1', prop2: 'val2' }),
      `returns false when arg is an object literal with props`
    );
  });
  it('returns true when arg is an empty object literal', () => {
    assert.isTrue(
      isEmptyObject({}),
      `returns true when arg is an empty object literal`
    );
  });
});
