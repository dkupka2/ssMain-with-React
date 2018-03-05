import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socket } from '../store/socket'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

import {
    initialTableRender,
} from '../store/reducers/dataTable'

// action keys
import {
    LOAD_TABLE,
    RESPONSE_RESTAPI
} from '../store/actions/'

class DataTable extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        socket.on(RESPONSE_RESTAPI, (data) => {
            this.props.initialTableRender(data)
        } )
    }

    render() {
        return (
            <div>
                <p>length should be: {this.props.data.length} </p>
                <ReactTable
                data={this.props.data}
                columns={this.props.columns}
                />
            </div>
        )
    }
}

const mapState = state => {
    return {
        data: state.dataTable.tableData,
        columns: state.dataTable.columns,
    }
}

const mapDispatch = dispatch => {
    return {
        initialTableRender: (data) => dispatch( initialTableRender(data) )
    }
}

export default connect(mapState, mapDispatch)(DataTable)