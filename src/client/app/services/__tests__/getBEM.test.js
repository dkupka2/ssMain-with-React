let assert = require('chai').assert;
import { getBEM } from '../';

let getBEMWith2 = getBEM('arg1', 'arg2');
let getBEMWith3 = getBEM('arg1', 'arg2', 'arg3');
let getBEMWith4 = getBEM('arg1', 'arg2', 'arg3', 'arg4');

describe('getBEM', () => {
  it(`'Elem' if no modifiers`, () => {
    assert.equal(
      getBEMWith2,
      'arg1_arg2',
      `returns a matching string without Modifiers`
    );
  });
  it(`'Elem Mod' if one modifier`, () => {
    assert.isString(getBEMWith3, `returns a string with one Modifier`);
    assert.equal(
      getBEMWith3,
      'arg1_arg2 arg1_arg2_arg3',
      `returns a matching string with one Modifier`
    );
  });
  it(`'Elem Mod1 Mod2' if two modifiers`, () => {
    assert.isString(getBEMWith4, `returns a string with one Modifier`);
    assert.equal(
      getBEMWith4,
      'arg1_arg2 arg1_arg2_arg3 arg1_arg2_arg4',
      `returns a matching string with two Modifiers`
    );
  });
});
