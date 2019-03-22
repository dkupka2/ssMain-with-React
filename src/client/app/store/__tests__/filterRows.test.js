const assert = require('chai').assert;
import { filterRows } from '../';

let testRow = {
  _original: {
    string: 'string'
  }
};

let filterTest = {
  value: 'test'
};

describe('filterRows', () => {
  it('returns undefined if data cell value is undefined', () => {
    assert.isUndefined(
      filterRows(null, testRow, null),
      `returns undefined if data cell value is undefined`
    );
  });
  it('returns false if data cell value does not include filter value', () => {
    assert.isFalse(
      filterRows(filterTest, testRow, 'string'),
      `returns false if data cell value does not include filter value`
    );
  });
  it('returns true if data cell value includes filter value', () => {
    assert.isTrue(
      filterRows({ value: 's' }, testRow, 'string'),
      `returns true if data cell value includes filter value: s`
    );
    assert.isTrue(
      filterRows({ value: 'st' }, testRow, 'string'),
      `returns true if data cell value includes filter value: st`
    );
    assert.isTrue(
      filterRows({ value: 'str' }, testRow, 'string'),
      `returns true if data cell value includes filter value: str`
    );
    assert.isTrue(
      filterRows({ value: 'stri' }, testRow, 'string'),
      `returns true if data cell value includes filter value: stri`
    );
    assert.isTrue(
      filterRows({ value: 'strin' }, testRow, 'string'),
      `returns true if data cell value includes filter value: strin`
    );
    assert.isTrue(
      filterRows({ value: 'string' }, testRow, 'string'),
      `returns true if data cell value includes matching string`
    );
  });
});
