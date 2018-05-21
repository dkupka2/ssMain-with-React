export const getBEM = (block, element, ...modifiers) => {
    let final = `${block}_${element}`
    modifiers.map( (modifier) => {
        final = final.concat(` ${block}_${element}_${modifier}`)
    })
    return final
}
