let assert = require('chai').assert;
import { validateAcctNumberInput } from '..';

describe('validateAcctNumberInput', () => {
  it('returns an empty string when arg has no valid characters', () => {
    assert.equal(
      validateAcctNumberInput(),
      '',
      `did not return an empty string when arg is undefined`
    );
    assert.equal(
      validateAcctNumberInput('x'),
      '',
      `did not return an empty string when arg is invalid character`
    );
  });
  it('returns a matching string: up to four numeric characters', () => {
    assert.equal(
      validateAcctNumberInput('1'),
      '1',
      `did not return a matching string: '1'`
    );
    assert.equal(
      validateAcctNumberInput('12'),
      '12',
      `did not return a matching string: '12'`
    );
    assert.equal(
      validateAcctNumberInput('123'),
      '123',
      `did not return a matching string: '123'`
    );
    assert.equal(
      validateAcctNumberInput('1234'),
      '1234',
      `did not return a matching string: '1234'`
    );
    assert.equal(
      validateAcctNumberInput('12345'),
      '1234',
      `did not return a matching substring when length is beyond limit: 12345`
    );
  });
  it('returns a valid string without the last character if invalid', () => {
    assert.equal(
      validateAcctNumberInput('1x'),
      '1',
      `did not return a matching string when last character is invalid: '1x'`
    );
    assert.equal(
      validateAcctNumberInput('12x'),
      '12',
      `did not return a matching string when last character is invalid: '1x'`
    );
    assert.equal(
      validateAcctNumberInput('123x'),
      '123',
      `did not return a matching string when last character is invalid: '1x'`
    );
    assert.equal(
      validateAcctNumberInput('1234x'),
      '1234',
      `did not return a matching string when last character is invalid: '1x'`
    );
  });
});
