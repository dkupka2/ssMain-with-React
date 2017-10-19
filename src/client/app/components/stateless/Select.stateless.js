import React from 'react';

// stateless select component

const Select = (props) => {
    const {selector, prompt, val, handleChange, options} = props
    return(
        <div {selector + "-parentDiv"}>
            <p className={selector + " p"}>{prompt}</p>
            <select className={selector + " select"} value={val} 
            onChange={(event) => handleChange(event)}>
                {options}
            </select>
        </div>
    )
}

export default Select