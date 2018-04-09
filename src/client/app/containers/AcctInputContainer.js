import React, { Component } from 'react'
import { connect } from 'react-redux'
import { validateInput } from '../services/'
import { socket } from '../store/socket'
import { Input } from '../components'
// action creators
import {
    submitAcct,
} from '../store/reducers'
// action keys
import {
    SUBMIT_ACCT_INPUT
} from '../store/actions/'

class AcctInputContainer extends Component {
    constructor(props) {
        super(props),
        this.state = {
            inputValue: ''
        }
    }

    handleInputChange(e) {
        this.setState( { inputValue: validateInput(e.target.value) } )
    }
    handleInputSubmit() {
        this.setState( {inputValue: ''} )
        this.props.submit(this.state.inputValue)
    }

    render() {
        return(
            <div>
                <Input
                    prompt='Enter an Account #:'
                    selector='acctInput'
                    value={this.state.inputValue}
                    change={ this.handleInputChange.bind(this) }
                    submit={ this.handleInputSubmit.bind(this) } />
                <p>
                    {this.props.message}
                </p>
            </div>
        )
    }
}

const mapState = state => {
    return {
        message: state.acctInput.message
    }
}

const mapDispatch = dispatch => {
    return {
        submit: (value) => dispatch( submitAcct(value) ),
    }
}

export default connect(mapState, mapDispatch)(AcctInputContainer)
