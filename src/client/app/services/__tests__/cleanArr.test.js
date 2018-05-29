let assert = require('chai').assert
import { cleanArr } from '../'

let fail ='cleanArr did not return'

describe('cleanArr', () => {
    it('returns an array when no args are passed', () => {
        assert.isArray(
            cleanArr(),
            `${fail} an array when no args were passed`
        )
    })
    it('returns an empty array when no args are passed', () => {
        assert.isEmpty(
            cleanArr(),
            `${fail} an empty array when no args were passed`
        )
    })
    it('returns matching array when arg only contains valid values', () => {
        let arg = [1,2,3]
        assert.equal(
            cleanArr(arg)[0],
            arg[0],
            `${fail} an array with matching value at index 0`
        )
        assert.equal(
            cleanArr(arg)[1],
            arg[1],
            `${fail} an array with matching value at index 1`
        )
        assert.equal(
            cleanArr(arg)[2],
            arg[2],
            `${fail} an array with matching value at index 2`
        )
        assert.equal(
            cleanArr(arg).length,
            arg.length,
            `${fail} an array with matching length`
        )
    })
    it('returns the arg array with null values removed', () => {
        let arg = [1, null, 3, null]
        assert.notInclude(
            cleanArr(arg),
            null,
            `${fail} arg array without null value`
        )
        assert.equal(
            cleanArr(arg).length,
            arg.length - 2,
            `${fail} array with length 2 fewer when passed array with two nulls`
        )
    })
    it('returns the arg array with undefined values removed', () => {
        let undef, arg
        arg = [1, undef, 3, undef]
        assert.notInclude(
            cleanArr(arg),
            undef,
            `${fail} arg array without null value`
        )
        assert.equal(
            cleanArr(arg).length,
            arg.length - 2,
            `${fail} array with length 2 fewer when passed array with two undef`
        )
    })
})
