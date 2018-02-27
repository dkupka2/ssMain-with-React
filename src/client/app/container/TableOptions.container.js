import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from '../components/Select'
import Button from '../components/Button'
// action creators
import {
    changeTable,
    changeType,
    loadTable
} from '../store/reducers/tableOptions'
// selectors
import { getSelectedAcct } from '../store/reducers/accts'
// action keys
// import {
// } from '../store/actions/'
// socket
import { socket } from '../store/socket'
// services
import { selectOptions } from '../services'

import { lists } from '../store/actions/tables'

let globalTables = lists.global
let localTables = lists.local
let compoundTables = lists.compound

let whichTables = type => {
    console.log("table type changed: ", type)
    switch (type) {
        case "local":
            return localTables
        case "global":
            return globalTables
        default:
            return compoundTables
    }
}

class Accts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: ["compound","local","global"],
            tables: compoundTables
        }
    }

    handleTypeChange(e) {
        this.setState({tables: whichTables(e.target.value)})
        this.props.changeType(e.target.value)
    }

    handleTableChange(e) {
        this.props.changeTable(e.target.value)
    }

    handleTableLoad(acct, table) {
        console.log("alert?")
        // this.props.loadTable()
        alert(`acct: ${acct} table: ${table}`)
    }

    componentWillMount() {
        console.log("accts", this.props.accts)
    }

    render() {
        // let selector = 
        return(
            <div>
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
                // change={ this.handleTableLoad.bind(this) }
                click={ () => { 
                    console.log("load clicked")
                    this.handleTableLoad( getSelectedAcct(), this.props.table )
                }}
                />
            </div>
        )
    }
}

const mapState = state => {
    return {
        type: state.tableOptions.type,
        table: state.tableOptions.table
    }
}

const mapDispatch = dispatch => {
    return {
        changeTable: (value) => { dispatch( changeTable(value) ) },
        changeType: (value) => { dispatch( changeType(value) ) },
        loadTable: (table) => { dispatch( loadTable(value) ) }
    }
}

export default connect(mapState, mapDispatch)(Accts)