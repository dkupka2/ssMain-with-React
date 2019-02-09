let assert = require('chai').assert;
import { generateBEMSelector } from '../';

let generateBEMSelectorWith2 = generateBEMSelector('arg1', 'arg2');
let generateBEMSelectorWith3 = generateBEMSelector('arg1', 'arg2', 'arg3');
let generateBEMSelectorWith4 = generateBEMSelector(
  'arg1',
  'arg2',
  'arg3',
  'arg4'
);

describe('generateBEMSelector', () => {
  it(`'Elem' if no modifiers`, () => {
    assert.equal(
      generateBEMSelectorWith2,
      'arg1_arg2',
      `returns a matching string without Modifiers`
    );
  });
  it(`'Elem Mod' if one modifier`, () => {
    assert.isString(
      generateBEMSelectorWith3,
      `returns a string with one Modifier`
    );
    assert.equal(
      generateBEMSelectorWith3,
      'arg1_arg2 arg1_arg2_arg3',
      `returns a matching string with one Modifier`
    );
  });
  it(`'Elem Mod1 Mod2' if two modifiers`, () => {
    assert.isString(
      generateBEMSelectorWith4,
      `returns a string with one Modifier`
    );
    assert.equal(
      generateBEMSelectorWith4,
      'arg1_arg2 arg1_arg2_arg3 arg1_arg2_arg4',
      `returns a matching string with two Modifiers`
    );
  });
});
