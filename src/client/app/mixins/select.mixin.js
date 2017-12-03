import React from 'react'

const selectOptions = (arr) => {
    let elems = []
    for (let el of arr) {
        elems.push(<option key={el.toString()} value={el}>{el}</option>)
    }
    return elems
}

export default selectOptions