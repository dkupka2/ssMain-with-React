let assert = require('chai').assert
import { enforceNumericInput } from '../'

let fail = `enforceNumericInput did not return`

describe('enforceNumericInput', () => {
    it('returns an empty string when arg has no valid characters', () => {
        assert.equal(
            enforceNumericInput(),
            '',
            `${fail} an empty string when arg is undefined`
        )
        assert.equal(
            enforceNumericInput('x'),
            '',
            `${fail} an empty string when arg is invalid character`
        )
    })
    it('returns a matching string: up to four numeric characters', () => {
        assert.equal(
            enforceNumericInput('1'),
            '1',
            `${fail} a matching string: '1'`
        )
        assert.equal(
            enforceNumericInput('12'),
            '12',
            `${fail} a matching string: '12'`
        )
        assert.equal(
            enforceNumericInput('123'),
            '123',
            `${fail} a matching string: '123'`
        )
        assert.equal(
            enforceNumericInput('1234'),
            '1234',
            `${fail} a matching string: '1234'`
        )
        assert.equal(
            enforceNumericInput('12345'),
            '1234',
            `${fail} a matching substring when length is beyond limit: 12345`
        )
    })
    it('returns a valid string without the last character if invalid', () => {
        assert.equal(
            enforceNumericInput('1x'),
            '1',
            `${fail} a matching string when last character is invalid: '1x'`
        )
        assert.equal(
            enforceNumericInput('12x'),
            '12',
            `${fail} a matching string when last character is invalid: '1x'`
        )
        assert.equal(
            enforceNumericInput('123x'),
            '123',
            `${fail} a matching string when last character is invalid: '1x'`
        )
        assert.equal(
            enforceNumericInput('1234x'),
            '1234',
            `${fail} a matching string when last character is invalid: '1x'`
        )
    })
})
