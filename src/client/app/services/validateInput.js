export const validateInput = (val) => {
    let arr
    if (val) {
        // if length is valid and last char is a number
        arr = Array.from(val) 
        if ( arr.length < 5 && ! isNaN( parseInt( arr[arr.length-1], 10 ) ) ) {
            return val.slice() 
        } else {
            // return string else return string without invalid char
            return val.slice(0,val.length-1)
        }
    } else return ""
}