let assert = require('chai').assert
import { checkArgs } from '../'

let fail = 'checkArgs did not return'

describe('checkArgs', () => {
    it('returns false if arg is undefined', () => {
        let arg
        assert.isFalse(
            checkArgs(arg),
            `${fail} false when arg is undefined`
        )
    })
    it('returns false if arg is null', () => {
        let arg = null
        assert.isFalse(
            checkArgs(arg),
            `${fail} false when arg is null`
        )
    })
    it('returns true when arg is valid: empty string', () => {
        assert.isTrue(
            checkArgs(' '),
            `${fail} true when argument is an empty string`
        )
    })
    it('returns true when arg is an array with no invalid elements', () => {
        let arg = [1,2,3]
        assert.isTrue(
            checkArgs(arg),
            `${fail} true when arg array has no invalid elements`
        )
    })
})
