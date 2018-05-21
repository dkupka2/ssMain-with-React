export const cleanArr = arr => {
    let final = []
    for (let el of arr) {
        if ( el !== undefined ) final.push(el)
    }
    return final
}
