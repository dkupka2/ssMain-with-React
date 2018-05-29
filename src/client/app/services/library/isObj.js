export const isObj = obj => {
    if (typeof obj !== 'object') return false
    if ( Array.isArray(obj) ) return false
    if (obj instanceof Set) return false
    if (obj instanceof Map) return false
    if (obj == undefined) return false
    return true
}
