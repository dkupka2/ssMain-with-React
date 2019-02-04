let assert = require('chai').assert;
import { blockSelector } from '../';

describe('blockSelector', () => {
  it('returns (arg2) when (arg1) is true', () => {
    assert.equal(
      blockSelector(true, 'string', false, ''),
      'string',
      `did not return (arg2) when (arg1) is true`
    );
  });
  it('returns (arg2) when (arg1) and (arg3) are both true', () => {
    assert.equal(
      blockSelector(true, 'string', true, ''),
      'string',
      `did not return (arg2) when (arg1) & arg(3) are both true`
    );
  });
  it('returns (arg4) if (arg3) is true and (arg1) is not true', () => {
    assert.equal(
      blockSelector(false, '', true, 'string'),
      'string',
      `did not return (arg4) when (arg3) is true and arg(1) is not true`
    );
  });
  it('retuns "hidden" when (arg1) and (arg3) are not true', () => {
    assert.equal(
      blockSelector(false, '', false, ''),
      'hidden',
      `did not return 'hidden' when (arg1) and (arg3) are not true`
    );
  });
});
