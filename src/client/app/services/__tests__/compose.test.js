let assert = require('chai').assert
import { compose } from '../'

let fail = 'compose did not return'

let fn1 = x => x + 1
let fn2 = x => x * 10

describe('compose', () => {
    it('composes args x,y,z as: y of x of z', () => {
        assert.equal(
            compose(fn1, fn2, 1),
            20,
            `${fail} 20: (1 + 1) * 10`
        )
        assert.equal(
            compose(fn2, fn1, 1),
            11,
            `${fail} 11: (1 * 10) + 1`
        )
    })
})
