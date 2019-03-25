const assert = require('chai').assert;
import { structureDataTable } from '../';

const objectFake = { a: 1, b: 2, c: 3 };
const mockCB = () => null;
const returnsA = a => a;
const returnsB = (a, b) => b;
const returnsC = (a, b, c) => c;
const a = 'a';

describe('structureDataTable', () => {
  it('returns a function', () => {
    assert.isFunction(structureDataTable(), `returns an array`);
  });
  it('returns a fn that iterates over the array (arg1)', () => {
    assert.equal(
      structureDataTable(objectFake)(mockCB).length,
      3,
      `returns a new array with length equal to original array`
    );
  });
  it('returns a fn that returns an array of objects', () => {
    assert.isObject(
      structureDataTable(objectFake)(mockCB)[0],
      `returns a new array of objects (el 1)`
    );
    assert.isObject(
      structureDataTable(objectFake)(mockCB)[1],
      `returns a new array of objects (el 2)`
    );
    assert.isObject(
      structureDataTable(objectFake)(mockCB)[2],
      `returns a new array of objects (el 3)`
    );
  });
  it('returns an array of objects with expected property values', () => {
    assert.equal(
      structureDataTable(objectFake)(mockCB)[0].Header,
      a,
      `returns a new array objects with expected Header value`
    );
    assert.equal(
      structureDataTable(objectFake)(mockCB)[0].accessor,
      a,
      `returns a new array objects with expected accessor value`
    );
    assert.equal(
      structureDataTable(objectFake)(mockCB)[0].id,
      a,
      `returns a new array objects with expected id value`
    );
    assert.isFalse(
      structureDataTable(objectFake)(mockCB)[0].filterAll,
      false,
      `returns a new array objects with expected filterAll value`
    );
  });
  it('returns a fn that returns an arr of objects with method: filterMethod', () => {
    assert.isFunction(
      structureDataTable(objectFake)(mockCB)[0].filterMethod,
      `returns a nested object with exected method (el 1)`
    );
    assert.isFunction(
      structureDataTable(objectFake)(mockCB)[1].filterMethod,
      `returns a nested object with exected method (el 2)`
    );
    assert.isFunction(
      structureDataTable(objectFake)(mockCB)[2].filterMethod,
      `returns a nested object with exected method (el 3)`
    );
  });
  it('returns a nested method that utilizes arguments as expected', () => {
    assert.equal(
      structureDataTable(objectFake)(returnsA)[0].filterMethod('test'),
      'test',
      `returns a nested method that utilizes (arg1) as expected`
    );
    assert.equal(
      structureDataTable(objectFake)(returnsB)[0].filterMethod(null, 'test'),
      'test',
      `returns a nested method that utilizes (arg2) as expected`
    );
    assert.equal(
      structureDataTable(objectFake)(returnsC)[0].filterMethod(null, null),
      a,
      `returns a nested method that returns the column value`
    );
  });
  it('returns an empty array when structure argument is empty', () => {
    assert.isArray(
      structureDataTable({})(mockCB),
      `returns an array when passed an empty object`
    );
    assert.isEmpty(
      structureDataTable({})(mockCB),
      `returns an empty array when passed an empty object`
    );
  });
});
