import { isTruthy } from '../'
// if arg1 than arg2 else hidden
export const showIfTrue = (x, sel) => isTruthy(x, sel, 'hidden')
