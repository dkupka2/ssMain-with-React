import React from 'react'

const Select = props => {
    return (
        <div className={`${props.selector}_div`}>
            <p className={`${props.selector}_p`}>
                {props.prompt}
            </p>
            <select className={`${props.selector}_select`} value={props.value} onChange={props.change} >
                {props.options}
            </select>
        </div>
    )
}

export default Select