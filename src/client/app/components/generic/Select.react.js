import React from 'react';

// generic select subcomponent, expects the following props:
// function: onSelectChange()
// string: val, selector, prompt
// array: options

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.onSelectChange(e.target.value)
    }
    render() {
        const { val, options, selector, prompt } = this.props
        const classFinal = options.length <= 1 ? "hidden" : selector
        return (
            <div className={`${classFinal}-parentDiv`}>
                <p className={classFinal}>{prompt}</p>
                <select className={classFinal} onChange={this.handleChange} value={val}>
                    {options}
                </select>
            </div>
        )
    }
}

export default Select