export const validateAcctInput = (val) => {
    let arr
    if (val) {
        arr = Array.from(val) // if length is valid and last char is a number
        if ( arr.length < 5 && ! isNaN( parseInt( arr[arr.length-1], 10 ) ) ) {
            console.log("Valid! ", val.slice())
            return val.slice() // return string
        } else {
            console.log("invalid: ", "val ", val, " sliced ", val.slice(0,4))
            return val.slice(0,val.length-1) // return string without invalid char
        }
    } else {
        return ""
    }
}