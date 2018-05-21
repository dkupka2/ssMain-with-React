export const checkArgs = ( ...args ) => {
    for (let arg of args) {
        if ( arg === undefined ) return false
    }
    return true
}
