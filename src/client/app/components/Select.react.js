import React from 'react';

// generic select subcomponent, expects the following props:
// function: onSelectChange()
// string: val, selector, prompt
// array: options

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onSelectChange(e.target.value);
    }
    render() {

        const { val, options, selector, prompt } = this.props;

        return (
            <div className={selector + "-parentDiv"}>
                <p className={selector}>{prompt}</p>
                <select className={selector} onChange={this.handleChange} value={val}>
                    {options}
                </select>
            </div>
        )
    }
}

export default Select;