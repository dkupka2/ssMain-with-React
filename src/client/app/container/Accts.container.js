import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from '../components/Select'
import { socket } from '../store/socket'
// library
import {
    selectOptions,
    getKeys,
    isTrue
} from '../services'
// action creators
import {
    restRes,
    changeSelect,
    cacheTable,
} from '../store/reducers/accts'
import {
    loadCache,
    renderTable
} from '../store/reducers/dataTable'
// action keys
import { RESPONSE_RESTAPI } from '../store/actions/'

class Accts extends Component {
    constructor(props) {
        super(props)
    }

    handleSelectChange(e) {
        this.props.changeSelect(e.target.value)
    }

    componentWillMount() {
        socket.on(RESPONSE_RESTAPI, (data) => {
            let { acct, table } = data,
            payload = {acct, table}
            payload.data = JSON.parse(data.body)
            payload.isCompound = isTrue(
                this.props.type === "compound"
            )
            payload.accts = this.props.accts
            this.props.restRes(payload)
        })
    }

    render() {
        let numAccts = getKeys(this.props.accts).length,
            acctsSelector = numAccts <= 1 ? "hidden" : "accts"
        return(
            <div className={acctsSelector} >
                <Select
                selector={acctsSelector}
                prompt="Select an Account:"
                value={this.props.selectValue}
                options={ selectOptions(this.props.accts) }
                change={ this.handleSelectChange.bind(this) }
                />
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

export default connect(mapState, mapDispatch)(Accts)