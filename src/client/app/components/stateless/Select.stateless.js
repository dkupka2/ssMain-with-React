import React from 'react';

// stateless select component

const Select = (props) => {
    return(
        <div {props.selector + "-parentDiv"}>
            <p className={props.selector + " p"}>{props.prompt}</p>
            <select className={props.selector + " select"} value={props.val} 
            onChange={(event) => props.handleChange(event)}>
                {props.options}
            </select>
        </div>
    )
}

export default Select;