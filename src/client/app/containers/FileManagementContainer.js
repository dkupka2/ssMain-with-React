import React, { Component } from 'react'
import { connect } from 'react-redux'
// library
import {
    isVisible,
    blockSelector
} from '../services'
// components
import { Button } from '../components'
// action creators
import {
    openOptions,
    closeOptions
} from '../store/reducers'
// action keys
import {
} from '../store/actions/'

class FileManagementContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // toggle visibility
        let parentSelector = blockSelector(
            this.props.visible,
            'fileManagement_parentDiv_closed',
            this.props.open,
            'fileManagement_parentDiv_open'
        )
        let openButtonSelector = isVisible(
            ! this.props.open,
            'fileManagement_openButton'
        )
        let closeButtonSelector = isVisible(
            this.props.open,
            'fileManagement_closeButton'
        )
        return(
            <div className={parentSelector}>
                <Button
                selector={openButtonSelector}
                prompt="file options"
                click={ this.props.openOptions.bind(this) } />
                <Button
                selector={closeButtonSelector}
                prompt="x"
                click={ this.props.closeOptions.bind(this) } />
            </div>
        )
    }
}

const mapState = state => {
    return {
        visible: state.fileManagement.visible,
        open: state.fileManagement.open
    }
}

const mapDispatch = dispatch => {
    return {
        openOptions: () => dispatch( openOptions() ),
        closeOptions: () => dispatch( closeOptions() )
    }
}

export default connect(mapState, mapDispatch)(FileManagementContainer)
