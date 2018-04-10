import React from 'react'

const Button = props => {
    let divSelector = props.selector === 'hidden' ?
        'hidden' : `${props.selector}_div`
    return (
        <div
            className={divSelector}>
            <button
                className={`${props.selector}_button`}
                onClick={props.click}>
                {props.prompt}
            </button>
        </div>
    )
}

export default Button
