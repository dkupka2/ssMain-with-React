let assert = require('chai').assert;
import { cleanArr } from '../';

describe('cleanArr', () => {
  it('returns an empty array when no args are passed', () => {
    let result = cleanArr();
    assert.isEmpty();
    assert.isEmpty(result, `returns an empty array when no args were passed`);
  });
  it('returns matching array when arg only contains valid values', () => {
    let arg = [1, 2, 3];
    assert.equal(
      cleanArr(arg)[0],
      arg[0],
      `returns an array with matching value at index 0`
    );
    assert.equal(
      cleanArr(arg)[1],
      arg[1],
      `returns an array with matching value at index 1`
    );
    assert.equal(
      cleanArr(arg)[2],
      arg[2],
      `returns an array with matching value at index 2`
    );
    assert.equal(
      cleanArr(arg).length,
      arg.length,
      `returns an array with matching length`
    );
  });
  it('returns the arg array with null values removed', () => {
    let arg = [1, null, 3, null];
    assert.notInclude(
      cleanArr(arg),
      null,
      `returns arg array without null value`
    );
    assert.equal(
      cleanArr(arg).length,
      arg.length - 2,
      `returns array with length 2 fewer when passed array with two nulls`
    );
  });
  it('returns the arg array with undefined values removed', () => {
    let undef, arg;
    arg = [1, undef, 3, undef];
    assert.notInclude(
      cleanArr(arg),
      undef,
      `returns arg array without null value`
    );
    assert.equal(
      cleanArr(arg).length,
      arg.length - 2,
      `returns array with length 2 fewer when passed array with two undef`
    );
  });
});
