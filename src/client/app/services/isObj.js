export const isObj = obj => {
    if (typeof obj === 'object') {
        if ( Array.isArray(obj) ) {
            return false
        } else {
            return true
        }
    }
    return false
}
