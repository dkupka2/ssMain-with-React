import React, { Component } from 'react'
import { connect } from 'react-redux'

import Select from '../components/Select'

// action creators
import {
    changeSelect
} from '../store/reducers/accts'
// action keys
// import {
// } from '../store/actions/'
// socket
import { socket } from '../store/socket'
// services
import { selectOptions } from '../services'

class Accts extends Component {
    constructor(props) {
        super(props)
    }

    handleSelectChange(e) {
        this.props.changeSelect(e.target.value)
    }

    componentWillMount() {
        console.log("accts", this.props.accts)
    }

    render() {
        let numAccts = Object.keys(this.props.accts).length,
            acctsSelector = numAccts <= 1 ? "hidden" : "accts"
        return(
            <div className={acctsSelector}>
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
        selectValue: state.accts.selectedAcct,
        accts: state.accts.accts
    }
}

const mapDispatch = dispatch => {
    return {
        changeSelect: (value) => { dispatch( changeSelect(value) ) }
    }
}

export default connect(mapState, mapDispatch)(Accts)