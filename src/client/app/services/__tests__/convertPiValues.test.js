let assert = require('chai').assert;
import { convertPiValues } from '../';

let test = (type, ...data) => convertPiValues([...data], type);

describe('convertPiValues', () => {
  it(`returns values as expected for case: 'timed auto type'`, () => {
    let testAuto = x => test('timed auto type', x);
    assert.equal(
      testAuto(1),
      'add message',
      'returns expected value for timed auto 1'
    );
    assert.equal(
      testAuto(2),
      'change status',
      'returns expected value for timed auto 2'
    );
    assert.equal(
      testAuto(3),
      'timed action',
      'returns expected value for timed auto 3'
    );
  });
  // it(`returns values as expected for case: 'message status'`), () => {
  //     let testStatus = x => test('message status', x);
  //     assert.equal(
  //     );
  //   };
});
