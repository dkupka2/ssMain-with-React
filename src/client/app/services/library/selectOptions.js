import React from 'react'
import { isObj } from './isObj'

export const selectOptions = (obj) => {
    let arr,
        elems = []
    if ( isObj(obj) && Object.keys(obj).length > 0 ) {
        arr = Object.keys(obj)
    } else {
        arr = obj
    }
    if (arr === undefined) return
    if (arr.length > 0 ) {
        arr.map( (el) => elems.push(
                <option
                    key={ el.toString() }
                    value={el} >
                    {el}
                </option>
            )
        )
        return elems
    }
}
