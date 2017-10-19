export const validateAcctInput = (val) => {
    let arr
    if (val) {
        arr = Array.from(val) // if length is valid and last char is a number
        if ( arr.length < 5 && ! isNaN( parseInt( arr[arr.length-1], 10 ) ) ) {
            return val.slice() // return string
        } else {
            return val.slice(0,val.length-1) // return string without invalid char
        }
    } else {
        return ""
    }
}