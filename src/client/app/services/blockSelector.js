import { isTrue } from './index'
import { isVisible } from './index'
// if arg1 than arg2 else if arg3 than arg 4 else hidden
export const blockSelector = (c1, res1, c2, res2) => {
    return isTrue( c2, res2, isVisible(c1, res1 ) )
}
