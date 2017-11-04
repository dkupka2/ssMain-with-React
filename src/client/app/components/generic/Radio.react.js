import React from 'react'
// generic radio subcomponent, expects the following props:
// function: onRadioChange
// string: selector, prompt
// array: options

class Radio extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.onRadioChange(e.target.value);
    }
    render() {
        const { selector, prompt, options } = this.props;
        return (
            <div className={selector + "-parentDiv"}>
                <p className={selector}>{prompt}</p>
                <div className={selector + "-radioDiv"} onChange={this.handleChange}>
                    {options}
                </div>
            </div>
        )
    }
}

export default Radio