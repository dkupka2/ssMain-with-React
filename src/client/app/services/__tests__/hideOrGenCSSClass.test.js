let assert = require('chai').assert;
import { hideOrGenCSSClass } from '../';

describe('hideOrGenCSSClass', () => {
  it(`returns 'hidden' if selector is 'hidden'`, () => {
    assert.equal(
      hideOrGenCSSClass('hidden', 'string'),
      'hidden',
      `did not return 'hidden' when selector is 'hidden'`
    );
  });
  it(`returns 'selector_element' when selector is not 'hidden'`, () => {
    hideOrGenCSSClass('string1', 'string2'),
      'string1_string2',
      `did not return 'string1_string2' when selector is not 'hidden': 'string1'`;
  });
});
