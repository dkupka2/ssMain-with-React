import React from 'react';

// generic input subcomponent, expects the following props:
// function: onButtonClick()
// string: selector, prompt

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.onButtonClick(this.props.val);
    }
    render() {

        const { selector, prompt } = this.props;

        return (
            <div className={selector + "-parentDiv"}>
                <button className={selector}
                onClick={this.handleClick}>{prompt}</button>
            </div>
        )
    }
}

export default Button;