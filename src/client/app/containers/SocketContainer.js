import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socket } from '../store/socket'
// action creators
import {
    restRes,
    validateClient
} from '../store/reducers'
// action keys
import {
    SUBMIT_ACCT_INPUT,
    RESPONSE_VALIDATE_CLIENT,
    RESPONSE_RESTAPI,
} from '../store/actions/'

class SocketContainer extends Component {

    componentWillMount() {
        socket.on(RESPONSE_VALIDATE_CLIENT, (data) => {
            this.props.validateClient(data)
        })
        socket.on(RESPONSE_RESTAPI, (data) => {
            let payload = {
                acct: data.acct,
                resTable: data.table,
                data: JSON.parse(data.body),
                accts: this.props.accts,
                optTable: this.props.table
            }
            this.props.restRes(payload)
        })
    }

    render() {
        return(
            <div className='hidden'>
            </div>
        )
    }
}

const mapState = state => {
    return {
        accts: state.accts.accts,
        table: state.tableOptions.table,
    }
}

const mapDispatch = dispatch => {
    return {
        validateClient: (data) => dispatch( validateClient(data) ),
        restRes: (payload) => dispatch( restRes(payload) ),
    }
}

export default connect(mapState, mapDispatch)(SocketContainer)