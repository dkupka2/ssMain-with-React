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
  it('returns undefined if filterValue includes non-closed or malformed operator', () => {
    assert.isUndefined(
      filterRows({value: ' [ '}, testRow, 'string'),
      `returns undefined if filterValue includes non-closed or malformed operator`
    );
    assert.isUndefined(
      filterRows({value: ' [A '}, testRow, 'string'),
      `returns undefined if filterValue includes non-closed or malformed operator`
    );
    assert.isUndefined(
      filterRows({value: ' [AN '}, testRow, 'string'),
      `returns undefined if filterValue includes non-closed or malformed operator`
    );
    assert.isUndefined(
      filterRows({value: ' [AND '}, testRow, 'string'),
      `returns undefined if filterValue includes non-closed or malformed operator`
    );
        assert.isUndefined(
      filterRows({value: ' [O '}, testRow, 'string'),
      `returns undefined if filterValue includes non-closed or malformed operator`
    );
    assert.isUndefined(
      filterRows({value: ' [OR '}, testRow, 'string'),
      `returns undefined if filterValue includes non-closed or malformed operator`
    );
  });
  it('returns true with union operator when input contains values on both sides', () => {
    assert.isTrue(
      filterRows({value: 's [AND] t'}, testRow, 'string'),
      `returns true with union operator when input contains values on both sides`
    );
  });
  it('returns false with union operator when input contains value from one or no sides', () => {
    assert.isFalse(
      filterRows({value: '  [AND]  '}, testRow, 'string'),
      `returns false with union operator when input contains value from one or no sides`
    );
  });
  it('returns true with or operator when input contains value from one or more sides', () => {
    assert.isTrue(
      filterRows({value: 's [OR]'}, testRow, 'string'),
      `returns true with or operator when input contains value from one or more sides`
    );
    assert.isTrue(
      filterRows({value: '[OR] t'}, testRow, 'string'),
      `returns true with or operator when input contains value from one or more sides`
    );
    assert.isTrue(
      filterRows({value: 's [OR] t'}, testRow, 'string'),
      `returns true with or operator when input contains value from one or more sides`
    );
    assert.isTrue(
      filterRows({value: 's [OR] b'}, testRow, 'string'),
      `returns true with or operator when input contains value from one or more sides`
    );
  });
  it('returns false with or operator when input does not contain value from either side', () => {
    assert.isFalse(
      filterRows({value: 'a [OR] b'}, testRow, 'string'),
      `returns false with or operator when input does not contain value from either side`
    );
  });
});