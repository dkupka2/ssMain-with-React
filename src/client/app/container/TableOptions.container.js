import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from '../components/Select'
import Button from '../components/Button'
import { socket } from '../store/socket'
import { selectOptions } from '../services'
// action creators
import {
    changeTable,
    changeType,
    loadTable
} from '../store/reducers/tableOptions'
// action keys
// import {
// } from '../store/actions/'

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
        alert(`acct: ${acct} table: ${table}`)
    }

    componentWillMount() {
    }

    render() {
        let selector = this.props.acctsLength > 0 ? "tableOptions" : "hidden"
        return(
            <div className={selector} >
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
                click={ () => { 
                    this.handleTableLoad( this.props.selectedAcct, this.props.table )
                }}
                />
            </div>
        )
    }
}

const mapState = state => {
    return {
        type: state.tableOptions.type,
        table: state.tableOptions.table,
        selectedAcct: state.accts.selectedAcct,
        acctsLength: Object.keys(state.accts.accts).length
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