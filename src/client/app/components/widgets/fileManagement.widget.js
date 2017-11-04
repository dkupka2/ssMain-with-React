import React from 'react';

import Select from './components/generic/Select.react'
import Button from './components/generic/Button.react'

// widget componenet for file management

class FileManagement extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.onSelectChange(e.target.value);
    }
    render() {
        const { val, options, selector, prompt } = this.props
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

export default FileManagement