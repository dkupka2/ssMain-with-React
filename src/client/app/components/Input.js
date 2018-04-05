import React from 'react'

const Input = props => {
    return (
        <div
            className={`${props.selector}_div`}>
            <p
                className={`${props.selector}_p`}>
                {props.prompt}
            </p>
            <input
                className={`${props.selector}_input`}
                type='text' value={props.value}
                onChange={props.change} />
            <button
                className={`${props.selector}_button`}
                onClick={props.submit}>
                Submit
            </button>
        </div>
    )
}

export default Input
