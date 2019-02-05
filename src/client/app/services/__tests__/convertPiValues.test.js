let assert = require('chai').assert;
import { convertPiValues } from '../';

let test = type => data => convertPiValues(type)(data);
let testAuto = x => test('timed auto type')([x]);
let testStatus = (...x) => test('message status')(x);

describe('convertPiValues', () => {
  it(`returns values as expected case: 'timed auto type'`, () => {
    assert.equal(
      testAuto(1),
      'add message',
      'returns add message for timed auto 1'
    );
    assert.equal(
      testAuto(2),
      'change status',
      'returns changed status for timed auto 2'
    );
    assert.equal(
      testAuto(3),
      'timed action',
      'returns timed action for timed auto 3'
    );
  });
  it(`returns values as expected for single element arrays case: 'message status'`, () => {
    assert.equal(
      testStatus(1),
      'delivered',
      'returns delivered for timed status 1'
    );
    assert.equal(
      testStatus(2),
      'hold',
      'returns hold for timed status: unary 2'
    );
    assert.equal(
      testStatus(3),
      'undelivered',
      'returns undelivered for timed status 3'
    );
    assert.equal(
      testStatus(4),
      'priority',
      'returns priority for timed status 4'
    );
  });
  it(`returns values as expected for multi-element arrays case: 'message status'`, () => {
    let result = testStatus(1, 3, 4).split(' ');
    assert.include(
      result,
      'delivered',
      `returns string with sub 'delivered' for array message status with keys 1, 3, 4`
    );
    assert.include(
      result,
      'undelivered',
      `returns string with sub 'undelivered' in string for array message status with keys 1, 3, 4`
    );
    assert.include(
      result,
      'priority',
      `returns string with sub 'priority' for array message status with keys 1, 3, 4`
    );
    assert.notInclude(
      result,
      'hold',
      `does not return string with sub 'hold' for array message status with keys 1, 3, 4`
    );
  });
});
