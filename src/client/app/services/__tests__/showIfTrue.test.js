let assert = require('chai').assert;
import { showIfTrue } from '../';

describe('showIfTrue', () => {
  it('returns "hidden" when condition is falsy', () => {
    assert.equal(
      showIfTrue('', 'string'),
      'hidden',
      `did not return 'hidden' when condition is falsy: ''`
    );
    assert.equal(
      showIfTrue(0, 'string'),
      'hidden',
      `did not return 'hidden' when condition is falsy: 0`
    );
  });
  it('returns "hidden" when condition is false', () => {
    assert.equal(
      showIfTrue(false, 'string'),
      'hidden',
      `did not return 'hidden' when condition is false`
    );
  });
  it('returns selector when condition is truthy', () => {
    assert.equal(
      showIfTrue(' ', 'string'),
      'string',
      `did not return selector when condition is truthy: ' '`
    );
    assert.equal(
      showIfTrue(1, 'string'),
      'string',
      `did not return selector when condition is truthy: 1`
    );
  });
  it('returns selector when condition is true', () => {
    assert.equal(
      showIfTrue(true, 'string'),
      'string',
      `did not return selector when condition is true`
    );
  });
});
