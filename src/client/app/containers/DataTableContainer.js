import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
// library
import { isVisible } from '../services'
// action creators
import { renderTable } from '../store/reducers'
// action keys
import {
    LOAD_TABLE,
    RESPONSE_RESTAPI
} from '../store/actions/'

class DataTableContainer extends Component {

    render() {
        return (
            <div
                className={
                    isVisible(this.props.visible, 'dataTable')
                }>
                <ReactTable
                    filterable
                    data={this.props.data}
                    columns={this.props.columns} />
            </div>
        )
    }
}

const mapState = state => {
    return {
        data: state.dataTable.tableData,
        columns: state.dataTable.columns,
        visible: state.dataTable.visible,
    }
}

const mapDispatch = dispatch => {
    return {
        renderTable: (data) => dispatch( renderTable(data) )
    }
}

export default connect(mapState, mapDispatch)(DataTableContainer)
