import React from 'react';

// generic select subcomponent, expects the following props:
// function: onInputChange(), onInputSubmit()
// string: val, selector, prompt, text
// array: options

const Button = (props)  => {
    return (
        <div {props.selector + "-parentDiv"}>
            <button className={props.selector + " button"}
             onClick={props.handleClick}>{props.prompt}</button>
        </div>
    )
}

export default Button;