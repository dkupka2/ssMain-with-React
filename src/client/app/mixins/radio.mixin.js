import React from 'react'

const radioOptions = (arr, name, checked) => {
    let elems = []
    for (let el of arr) {
        elems.push(<div key={el.toString()}><input type="radio" name={name} value={el} checked={el === checked} readOnly={el === checked}/>{el}</div>)
    }
    return elems
}


export default radioOptions