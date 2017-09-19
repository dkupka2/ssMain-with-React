import React from 'react';

// generic select subcomponent, expects the following props:
// function: onInputChange(), onInputSubmit()
// string: val, selector, prompt, text
// array: options

const Input = (props)  => {
    return (
        <div {props.selector + "-parentDiv"}>
            <p className={props.selector + " p"}>{props.prompt}</p>
            <input className={props.selector + " input"}
             onChange={props.handleChange} value={props.val} />
            <button className={props.selector + " button"}
             onClick={props.handleSubmit}>{props.text}</button>
        </div>
    )
}

export default Select;