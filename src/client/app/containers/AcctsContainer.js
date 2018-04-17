import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select } from '../components'
import { socket } from '../store/socket'
// library
import {
    selectOptions,
    getKeys,
    isVisible
} from '../services'
// action creators
import {
    // accts
    changeSelect,
    // dataTable
    renderTable,
} from '../store/reducers'

class AcctsContainer extends Component {

    handleSelectChange = (e) => {
        this.props.changeSelect(e.target.value)
    }

    render() {
        let numAccts = getKeys(this.props.accts).length
        return(
            <div
                className={ isVisible(numAccts > 1, 'accts') } >
                <Select
                    selector='accts'
                    prompt='Select an Account:'
                    value={this.props.selectValue}
                    options={ selectOptions(this.props.accts) }
                    change={this.handleSelectChange} />
            </div>
        )
    }
}

const mapState = state => {
    return {
        accts: state.accts.accts,
        selectValue: state.accts.selectedAcct,
        type: state.tableOptions.type,
    }
}

const mapDispatch = dispatch => {
    return {
        changeSelect: (value) => { dispatch( changeSelect(value) ) },
    }
}

export default connect(mapState, mapDispatch)(AcctsContainer)
