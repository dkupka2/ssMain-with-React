import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pubsub from 'pubsub-js'

import Input from '../components/Input'
import validateAcct from '../services/validateAcct'

class AcctInput extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div >
                <Input
                prompt="Enter an Account #:"
                selector="acctInput"
                value={this.props.value}
                change={this.props.change}
                submit={this.props.submit}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        value: state.acctInputValue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        change: (e) => dispatch({type: "UPDATE ACCT INPUT", value: e.target.value}),
        submit: () => dispatch({type: "SUBMIT ACCT INPUT"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcctInput)