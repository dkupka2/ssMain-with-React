import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '../components/Input'
import validateAcctFormat from '../services/validateInput'
import { socket } from '../store/socket'
// action creators
import { 
    submitAcct,
    validateClient
} from '../store/reducers/acctInput'
// action keys
import {
    SUBMIT_ACCT_INPUT,
    RESPONSE_VALIDATE_CLIENT
} from '../store/actions/'

class AcctInput extends Component {
    constructor(props) {
        super(props),
        this.state = {
            inputValue: ''
        }
    }

    handleInputChange(e) {
        this.setState({ inputValue: validateAcctFormat(e.target.value) })
    }

    handleInputSubmit() {
        this.props.submit(this.state.inputValue)
        this.setState( {inputValue: ""} )
    }

    componentWillMount() {
        socket.on(RESPONSE_VALIDATE_CLIENT, (data) => {
            this.props.validateClient(data)
        })
    }

    render() {
        return(
            <div>
                <Input
                prompt="Enter an Account #:"
                selector="acctInput"
                value={this.state.inputValue}
                change={ this.handleInputChange.bind(this) }
                submit={ this.handleInputSubmit.bind(this) }
                />
                <p>{this.props.message}</p>
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
        validateClient: (data) => dispatch( validateClient(data) ),
    }
}

export default connect(mapState, mapDispatch)(AcctInput)