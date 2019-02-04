let assert = require('chai').assert;
import { isArrayWithEls } from '../';

describe('isArraywithEls', () => {
  it('returns false when there is no arg', () => {
    assert.isFalse(isArrayWithEls(), `returns false when there is no arg`);
  });
  it('return false when arg is not an array', () => {
    assert.isFalse(isArrayWithEls(''), `returns true when arg is ''`);
    assert.isFalse(isArrayWithEls({}), `returns true when arg is {}`);
    assert.isFalse(isArrayWithEls(true), `returns true when arg is true`);
    assert.isFalse(isArrayWithEls(0), `returns true when arg is 0`);
  });
  it('returns false when arg is an empty array', () => {
    assert.isFalse(
      isArrayWithEls([]),
      `returns false when arg is an empty array`
    );
  });
  it('returns true when arg is an array with contents', () => {
    assert.isTrue(
      isArrayWithEls([1]),
      `returns true when arg is array with one elment`
    );
    assert.isTrue(
      isArrayWithEls([1, 2]),
      `returns true when arg is array with two elments`
    );
  });
});
