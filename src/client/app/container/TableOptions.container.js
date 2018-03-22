import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from '../components/Select'
import Button from '../components/Button'
import { socket } from '../store/socket'
import {
    selectOptions,
    getKeys,
    isTrue,
} from '../services'
// action creators
import {
    changeTable,
    changeType,
    restRequest,
    restResponse,
} from '../store/reducers/tableOptions'
// action keys
import {
    tables,
    RESPONSE_RESTAPI,
} from '../store/actions'
let { getTables } = tables

class Accts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: ["compound","local","global"],
            tables: getTables(this.props.type),
            visible: false
        }
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

    componentWillReceiveProps(newProps) {
        this.setState({ 
            visible: isTrue(getKeys(newProps.accts).length > 0)
        })
    }

    render() {
        return(
            <div className={ this.state.visible ?
                "tableOptions" : "hidden"
            } >
                <Select
                selector="type"
                prompt="Type of Table: "
                value={this.props.type}
                options={ selectOptions(this.state.types) }
                change={ this.handleTypeChange.bind(this) }
                />
                <Select
                selector="table"
                prompt="Which Table: "
                value={this.props.table}
                options={ selectOptions(this.state.tables) }
                change={ this.handleTableChange.bind(this) }
                />
                <Button
                selector="submit"
                prompt="load table"
                click={ () => { this.handleTableLoad(
                    this.props.selectedAcct,
                    this.props.type,
                    this.props.table
                    ) } }
                />
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

export default connect(mapState, mapDispatch)(Accts)
