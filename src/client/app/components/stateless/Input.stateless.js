import React from 'react';

// generic select subcomponent, expects the following props:
// function: onInputChange(), onInputSubmit()
// string: val, selector, prompt, text

const Input = (props)  => {
    const { selector, prompt, handleChange, handleSubmit, text, val } = props
    return (
        <div {selector + "-parentDiv"}>
            <p className={selector + " p"}>{prompt}</p>
            <input className={selector + " input"}
             onChange={handleChange} value={val} />
            <button className={selector + " button"}
             onClick={handleSubmit}>{text}</button>
        </div>
    )
}

export default Select;