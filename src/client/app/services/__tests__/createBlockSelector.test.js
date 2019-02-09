let assert = require('chai').assert;
import { createBlockSelector } from '../';

describe('createBlockSelector', () => {
  it('returns (arg2) when (arg1) is true', () => {
    assert.equal(
      createBlockSelector(true, 'string', false, ''),
      'string',
      `returns (arg2) when (arg1) is true`
    );
  });
  it('returns (arg2) when (arg1) and (arg3) are both true', () => {
    assert.equal(
      createBlockSelector(true, 'string', true, ''),
      'string',
      `returns (arg2) when (arg1) & arg(3) are both true`
    );
  });
  it('returns (arg4) if (arg3) is true and (arg1) is not true', () => {
    assert.equal(
      createBlockSelector(false, '', true, 'string'),
      'string',
      `returns (arg4) when (arg3) is true and arg(1) is not true`
    );
  });
  it('retuns "hidden" when (arg1) and (arg3) are not true', () => {
    assert.equal(
      createBlockSelector(false, '', false, ''),
      'hidden',
      `returns 'hidden' when (arg1) and (arg3) are not true`
    );
  });
});
