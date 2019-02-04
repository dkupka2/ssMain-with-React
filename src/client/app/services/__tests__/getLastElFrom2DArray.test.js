let assert = require('chai').assert;
import { getLastElFrom2DArray } from '../';

describe('getLastElFrom2DArray', () => {
  it('retuns an array if there is no arg', () => {
    assert.isArray(
      getLastElFrom2DArray(),
      `did not return an array if there is no arg`
    );
  });
  it('returns an empty array if there is no arg', () => {
    assert.isEmpty(
      getLastElFrom2DArray(),
      `did not return an array if there is no arg`
    );
  });
  it('returns the last element if arg contains one element', () => {
    assert.equal(
      getLastElFrom2DArray([1]),
      1,
      `did not return the only element`
    );
  });
  it('returns the last element if arg contains multiple elements', () => {
    assert.equal(
      getLastElFrom2DArray([1, 2]),
      2,
      `did not return the last element`
    );
  });
});
