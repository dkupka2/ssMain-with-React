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
    constructor(props) {
        super(props)
        this.state = {
            types: ['compound','local','global'],
            tables: getTables(this.props.type),
            visible: false
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({ 
            visible: isTrue(getKeys(newProps.accts).length > 0)
        })
    }

    handleTypeChange(e) {
        this.setState( { tables: getTables(e.target.value) } )
        this.props.changeType({
            type: e.target.value,
            acct: this.props.selectedAcct,
            accts: this.props.accts,
            table: tables.default[e.target.value],
        })
    }
    handleTableChange(e) {
        this.props.changeTable({
            type: this.props.type,
            acct: this.props.selectedAcct,
            accts: this.props.accts,
            table: e.target.value,
        })
    }
    handleTableLoad( acct, type, table ) {
        this.props.restRequest( {acct, type, table} )
    }

    render() {
        return(
            <div
                className={
                    isVisible(this.state.visible, 'tableOptions')
                } >
                <Select
                    selector='type'
                    prompt='Type of Table: '
                    value={this.props.type}
                    options={ selectOptions(this.state.types) }
                    change={ this.handleTypeChange.bind(this) } />
                <Select
                    selector='table'
                    prompt='Which Table: '
                    value={this.props.table}
                    options={ selectOptions(this.state.tables) }
                    change={ this.handleTableChange.bind(this) } />
                <Button
                    selector='submit'
                    prompt='load table'
                    click={ () => {
                        this.handleTableLoad(
                            this.props.selectedAcct,
                            this.props.type,
                            this.props.table
                        )
                    }} />
                <p>{this.props.message}</p>
                <p>{this.props.acctsLength}</p>
            </div>
        )
    }
}

const mapState = state => {
    return {
        type: state.tableOptions.type,
        table: state.tableOptions.table,
        message: state.tableOptions.message,
        // state from accts reducer
        accts: state.accts.accts,
        selectedAcct: state.accts.selectedAcct,
    }
}

const mapDispatch = dispatch => {
    return {
        changeType:  (data) => dispatch( changeType(data) ),
        changeTable: (data) => dispatch( changeTable(data) ),
        restRequest:  (data) => dispatch( restRequest(data) ),
        restResponse: (data) => dispatch( restResponse(data) ),
        loadCache: (data) => dispatch( loadCache(data) ),
    }
}

export default connect(mapState, mapDispatch)(AcctsContainer)
