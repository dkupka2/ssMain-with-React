let assert = require('chai').assert;
import { getLastElFrom2DArray } from '../';

describe('getLastElFrom2DArray', () => {
  it('retuns an array if there is no arg', () => {
    assert.isArray(
      getLastElFrom2DArray(),
      `returns an array if there is no arg`
    );
  });
  it('returns an empty array if there is no arg', () => {
    assert.isEmpty(
      getLastElFrom2DArray(),
      `returns an array if there is no arg`
    );
  });
  it('returns the last element if arg contains one element', () => {
    assert.equal(getLastElFrom2DArray([1]), 1, `returns the only element`);
  });
  it('returns the last element if arg contains multiple elements', () => {
    assert.equal(getLastElFrom2DArray([1, 2]), 2, `returns the last element`);
  });
});
