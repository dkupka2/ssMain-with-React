let assert = require('chai').assert
import { getLastArray } from '../'

let fail = 'getLast did not return'

describe('getLastArray', () => {
    it('retuns an array if there is no arg', () => {
        assert.isArray(
            getLastArray(),
            `${fail} an array if there is no arg`
        )
    })
    it('returns an empty array if there is no arg', () => {
        assert.isEmpty(
            getLastArray(),
            `${fail} an array if there is no arg`
        )
    })
    it('returns the last element if arg contains one element', () => {
        assert.equal(
            getLastArray([1]),
            1,
            `${fail} the only element`
        )
    })
    it('returns the last element if arg contains multiple elements', () => {
        assert.equal(
            getLastArray([1,2]),
            2,
            `${fail} the last element`
        )
    })
})
