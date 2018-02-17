import React, { Component } from 'react'
import { connect } from 'react-redux'

class Test extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div onClick={this.props.clicky}>{this.props.test}</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        test: state.prop
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clicky: () => dispatch({type: "TEST CLICKY"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)