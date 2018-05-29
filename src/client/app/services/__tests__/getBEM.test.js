let assert = require('chai').assert
import { getBEM } from '../'

let fail = 'getBEM did not return'

describe('getBEM', () => {
    let returns = 'returns a string'
    let BEM = 'Block_Elem Block_Elem_Mod'
    let BEMM = 'Block_Elem Block_Elem_Mod1 Block_Elem_Mod2'
    it(returns, () => {
        assert.isString(
            getBEM('arg1','arg2','arg3'),
            `${fail} a string`
        )
        assert.isString(
            getBEM('arg1','arg2','arg3','arg4'),
            `${fail} a string`
        )
    })
    it(`${returns}: 'Block_Elem' if no modifiers`, () => {
        assert.isString(
            getBEM('arg1', 'arg2'),
            `${fail} a string without Modifiers`
        )
        assert.equal(
            getBEM('arg1','arg2'),
            'arg1_arg2',
            `${fail} a matching string without Modifiers`
        )
    })
    it(`${returns}: '${BEM}' if one modifier`, () => {
        assert.isString(
            getBEM('arg1', 'arg2', 'arg3'),
            `${fail} a string with one Modifier`
        )
        assert.equal(
            getBEM('arg1','arg2','arg3'),
            'arg1_arg2 arg1_arg2_arg3',
            `${fail} a matching string with one Modifier`
        )
    })
    it(`${returns}: '${BEMM}' if two modifiers`, () => {
        assert.isString(
            getBEM('arg1', 'arg2', 'arg3', 'arg4'),
            `${fail} a string with one Modifier`
        )
        assert.equal(
            getBEM('arg1','arg2','arg3', 'arg4'),
            'arg1_arg2 arg1_arg2_arg3 arg1_arg2_arg4',
            `${fail} a matching string with two Modifiers`
        )
    })
})
