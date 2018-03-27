import React from 'react'

const Button = props => {
    return (
        <div
            className={`${props.selector}_div`}>
            <button
                className={`${props.selector}_button`}
                onClick={props.click}>
                {props.prompt}
            </button>
        </div>
    )
}

export default Button
