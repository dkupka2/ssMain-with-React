import React from 'react';

// generic select subcomponent, expects the following props:
// function: onInputChange(), onInputSubmit()
// string: val, selector, prompt, text
// array: options

const Button = (props)  => {
    const {selector, prompt, handleClick} = props
    return (
        <div {selector + "-parentDiv"}>
            <button className={selector + " button"}
             onClick={handleClick}>{prompt}</button>
        </div>
    )
}

export default Button