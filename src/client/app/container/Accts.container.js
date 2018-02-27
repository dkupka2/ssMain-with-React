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
        this.state = {
            test: Object.keys(this.props.accts) > 0 ? Object.keys(this.props.accts).length : 0
        }
    }

    handleSelectChange(e) {
        this.props.changeSelect(e.target.value)
    }

    componentWillMount() {
        console.log("accts", this.props.accts)
    }

    render() {
        return(
            <div>
                <Select
                prompt="Select an Account:"
                selector="accts"
                options={ selectOptions( this.props.accts ) }
                value={this.props.selectValue}
                change={ this.handleSelectChange.bind(this) }
                />
                <p>{this.state.test}</p>
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