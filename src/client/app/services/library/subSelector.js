export const subSelector = (selector, element) => {
    return selector === 'hidden' ?
        'hidden' :
        `${selector}_${element}`
}
