import React from 'react';

// generic bootstrap-alert-esque banner subcomponent,
// expects the following props:
// function: onBannerClose()
// string: selector, type, prompt

class Banner extends React.Component {
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
    }
    handleClose() {
        this.props.onBannerClose()
    }
    render() {
        const { selector, prompt, type } = this.props
        const classFinal = prompt === "" ? "hidden" : selector
        return (
            <div className={`${classFinal}-parentDiv`}>
                <div className = {`${classFinal} ${type}`}>
                    {prompt}
                    <button className={classFinal}
                     onClick={this.handleClose.bind(this)}>x</button>
                </div>
            </div>
        )
    }
}

export default Banner