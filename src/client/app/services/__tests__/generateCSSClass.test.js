let assert = require('chai').assert;
import { generateCSSClass } from '../';

describe('generateCSSClass', () => {
  it(`returns 'hidden' if selector is 'hidden'`, () => {
    assert.equal(
      generateCSSClass('hidden', 'string'),
      'hidden',
      `returns 'hidden' when selector is 'hidden'`
    );
  });
  it(`returns 'selector_element' when selector is not 'hidden'`, () => {
    generateCSSClass('string1', 'string2'),
      'string1_string2',
      `returns 'string1_string2' when selector is not 'hidden': 'string1'`;
  });
});
