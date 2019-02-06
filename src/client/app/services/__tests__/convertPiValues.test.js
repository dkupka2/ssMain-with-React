let assert = require('chai').assert;
import { convertPiValues } from '../';

let test = type => data => convertPiValues(type)(data);
let testAuto = x => test('timed auto type')([x]);
let testStatus = (...x) => test('message status')(x);
let testDotW = (...x) => test('days of the week')(x);
let testContacts = x => test('contacts')(x);

describe('convertPiValues', () => {
  it(`returns values as expected case 'timed auto type'`, () => {
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
  it(`returns values as expected for single element data arrays case 'message status'`, () => {
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
  it(`returns values as expected for multi-element data array case 'message status'`, () => {
    let result = testStatus(1, 3, 4).split(' ');
    assert.include(
      result,
      'delivered',
      `returns string with sub 'delivered' for case 'message status' keys 1, 3, 4`
    );
    assert.include(
      result,
      'undelivered',
      `returns string with sub 'undelivered' in string for case 'message status' keys 1, 3, 4`
    );
    assert.include(
      result,
      'priority',
      `returns string with sub 'priority' for case 'message status' keys 1, 3, 4`
    );
    assert.notInclude(
      result,
      'hold',
      `does not return string with sub 'hold' for case 'message status' keys 1, 3, 4`
    );
  });
  it(`returns values as expected for single element data array case 'days of the week'`, () => {
    let result = testDotW(1, 7).split(' ');
    assert.include(
      result,
      'Sun',
      `returns string with sub 'Sun' for case 'days of the week' keys 1, 7`
    );
    assert.include(
      result,
      'Sat',
      `returns string with sub 'Sat' for case 'days of the week keys 1, 7'`
    );
    assert.notInclude(
      result,
      'Mon',
      `does not return string with sub 'Mon' for case 'days of the week keys 1, 7'`
    );
    assert.notInclude(
      result,
      'Tues',
      `does not return string with sub 'Tues' for case 'days of the week keys 1, 7'`
    );
    assert.notInclude(
      result,
      'Wed',
      `does not return string with sub 'Wed' for case 'days of the week keys 1, 7'`
    );
    assert.notInclude(
      result,
      'Thurs',
      `does not return string with sub 'Thurs' for case 'days of the week keys 1, 7'`
    );
    assert.notInclude(
      result,
      'Fri',
      `does not return string with sub 'Fri' for case 'days of the week keys 1, 7'`
    );
  });
  it(`returns values as expected for data object case 'contacts'`, () => {
    let dataNAME = { NAME: 'name' };
    let dataNUMBER = { NUMBER: '2222' };
    let dataUSER = { SM_USER: 'user' };
    let dataEMAIL = { EMAIL_ADDY: 'address@domain.com' };
    let dataUSERWithEMAIL = { ...dataUSER, ...dataEMAIL };
    assert.include(
      testContacts(dataNAME).split(' '),
      'name',
      `returned string with sub 'name' for case 'contacts' with key/value NAME: 'name'`
    );
    assert.include(
      testContacts(dataNUMBER).split(' '),
      '2222',
      `returned string with sub '2222' for case 'contacts' with key/value NUMBER:2222`
    );
  });
});
