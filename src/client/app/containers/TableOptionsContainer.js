import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socket } from '../store/socket'
// library
import {
    selectOptions,
    getKeys,
    isTrue,
    isVisible,
} from '../services'
import {
    Select,
    Button,
} from '../components'
// action creators
import {
    changeTable,
    changeType,
    restRequest,
    restResponse,
} from '../store/reducers'
// action keys
import {
    tables,
    RESPONSE_RESTAPI,
} from '../store/actions'
let { getTables } = tables

class AcctsContainer extends Component {
    state = {
        types: ['compound','local','global'],
        tables: getTables(this.props.type),
        visible: false
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            visible: isTrue(getKeys(newProps.accts).length > 0)
        })
    }

    handleTypeChange = (e) => {
        this.setState( { tables: getTables(e.target.value) } )
        this.props.changeType({
            type: e.target.value,
            acct: this.props.selectedAcct,
            accts: this.props.accts,
            optTable: tables.default[e.target.value],
        })
    }
    handleTableChange = (e) => {
        this.props.changeTable({
            type: this.props.type,
            acct: this.props.selectedAcct,
            accts: this.props.accts,
            optTable: e.target.value,
        })
    }
    handleTableLoad = ( acct, type, optTable ) => {
        this.props.restRequest( {acct, type, optTable} )
    }

    render() {
        return(
            <div
                className={
                    isVisible(this.state.visible, 'tableOptions')
                } >
                <Select
                    selector='tableOptions_type'
                    prompt='Type of Table: '
                    value={this.props.type}
                    options={ selectOptions(this.state.types) }
                    change={this.handleTypeChange} />
                <Select
                    selector='tableOptions_table'
                    prompt='Which Table: '
                    value={this.props.table}
                    options={ selectOptions(this.state.tables) }
                    change={this.handleTableChange} />
                <div
                    className='tableOptions_messageDiv' >
                    <Button
                        selector='tableOptions_submit'
                        prompt='load table'
                        click={ () => {
                            this.handleTableLoad(
                                this.props.selectedAcct,
                                this.props.type,
                                this.props.table
                            )
                        }} />
                    <p
                        className={this.props.messageClass}>
                        {this.props.message} </p>
                </div>
            </div>
        )
    }
}

const mapState = state => {
    return {
        type: state.tableOptions.type,
        table: state.tableOptions.table,
        message: state.tableOptions.message,
        messageClass: state.tableOptions.messageClass,
        // state from accts reducer
        accts: state.accts.accts,
        selectedAcct: state.accts.selectedAcct,
    }
}

const mapDispatch = dispatch => {
    return {
        loadCache: (data) => dispatch( loadCache(data) ),
        changeType: (data) => dispatch( changeType(data) ),
        changeTable: (data) => dispatch( changeTable(data) ),
        restRequest: (data) => dispatch( restRequest(data) ),
        restResponse: (data) => dispatch( restResponse(data) ),
    }
}

export default connect(mapState, mapDispatch)(AcctsContainer)
