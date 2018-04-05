export const isArrOrObj = obj => {
    if (typeof obj === 'object') {
        if (obj.length === undefined) {
            return 'object'
        } else {
            return 'array'
        }
    } else {
        return
    }
}