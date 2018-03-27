import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select } from '../components'
import { socket } from '../store/socket'
// library
import {
    selectOptions,
    getKeys,
    isTrue,
    isVisible
} from '../services'
// action creators
import {
    // accts
    restRes,
    changeSelect,
    cacheTable,
    // dataTable
    loadCache,
    renderTable
} from '../store/reducers'
// action keys
import { RESPONSE_RESTAPI } from '../store/actions/'

class AcctsContainer extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        socket.on(RESPONSE_RESTAPI, (data) => {
            let { acct, table } = data,
            payload = {acct, table}
            payload.data = JSON.parse(data.body)
            payload.isCompound = isTrue(
                this.props.type === 'compound'
            )
            payload.accts = this.props.accts
            this.props.restRes(payload)
        })
    }

    handleSelectChange(e) {
        this.props.changeSelect(e.target.value)
    }

    render() {
        let numAccts = getKeys(this.props.accts).length
        return(
            <div
                className={isVisible(numAccts > 1, 'accts')} >
                <Select
                    selector='accts'
                    prompt='Select an Account:'
                    value={this.props.selectValue}
                    options={ selectOptions(this.props.accts) }
                    change={ this.handleSelectChange.bind(this) } />
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
        restRes: (payload) => { dispatch( restRes(payload)) }
    }
}

export default connect(mapState, mapDispatch)(AcctsContainer)