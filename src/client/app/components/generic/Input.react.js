import React from 'react';

// generic input subcomponent, expects the following props:
// function: onInputSubmit()
// string: selector, prompt, text

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.props.onInputChange(e.target.value)
    }
    handleSubmit() {
        this.props.onInputSubmit(this.props.val)
    }
    render() {
        const { selector, prompt, val } = this.props
        return (
            <div className={`${selector}-parentDiv`}>
                <p className={`${selector} p`}>{prompt}</p>
                <input className={`${selector} input`} value={val}
                onChange={this.handleChange}/>
                <button className={`${selector} button`}
                onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default Input