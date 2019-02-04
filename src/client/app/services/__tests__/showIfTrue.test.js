let assert = require('chai').assert;
import { showIfTrue } from '../';

describe('showIfTrue', () => {
  it('returns "hidden" when condition is falsy', () => {
    assert.equal(
      showIfTrue('', 'string'),
      'hidden',
      `returns 'hidden' when condition is falsy: ''`
    );
    assert.equal(
      showIfTrue(0, 'string'),
      'hidden',
      `returns 'hidden' when condition is falsy: 0`
    );
  });
  it('returns "hidden" when condition is false', () => {
    assert.equal(
      showIfTrue(false, 'string'),
      'hidden',
      `returns 'hidden' when condition is false`
    );
  });
  it('returns selector when condition is truthy', () => {
    assert.equal(
      showIfTrue(' ', 'string'),
      'string',
      `returns selector when condition is truthy: ' '`
    );
    assert.equal(
      showIfTrue(1, 'string'),
      'string',
      `returns selector when condition is truthy: 1`
    );
  });
  it('returns selector when condition is true', () => {
    assert.equal(
      showIfTrue(true, 'string'),
      'string',
      `returns selector when condition is true`
    );
  });
});
