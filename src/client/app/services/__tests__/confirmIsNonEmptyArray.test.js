let assert = require('chai').assert;
import { confirmIsNonEmptyArray } from '../';

describe('isArraywithEls', () => {
  it('returns false when there is no arg', () => {
    assert.isFalse(
      confirmIsNonEmptyArray(),
      `returns false when there is no arg`
    );
  });
  it('return false when arg is not an array', () => {
    assert.isFalse(confirmIsNonEmptyArray(''), `returns true when arg is ''`);
    assert.isFalse(confirmIsNonEmptyArray({}), `returns true when arg is {}`);
    assert.isFalse(
      confirmIsNonEmptyArray(true),
      `returns true when arg is true`
    );
    assert.isFalse(confirmIsNonEmptyArray(0), `returns true when arg is 0`);
  });
  it('returns false when arg is an empty array', () => {
    assert.isFalse(
      confirmIsNonEmptyArray([]),
      `returns false when arg is an empty array`
    );
  });
  it('returns true when arg is an array with contents', () => {
    assert.isTrue(
      confirmIsNonEmptyArray([1]),
      `returns true when arg is array with one elment`
    );
    assert.isTrue(
      confirmIsNonEmptyArray([1, 2]),
      `returns true when arg is array with two elments`
    );
  });
});
