export const isObject = obj => {
    if (typeof obj === 'object') {
        if ( Array.isArray(obj) ) {
            return false
        } else {
            return true
        }
    } else {
        return false
    }
}
