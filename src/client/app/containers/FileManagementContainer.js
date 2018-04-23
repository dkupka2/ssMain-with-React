import React, { Component } from 'react'
import { connect } from 'react-redux'
// library
import {
    isVisible,
    blockSelector,
    getLast
} from '../services'
// components
import {
    Button,
    Select
} from '../components'
// action creators
import {
    openOptions,
    closeOptions,
    backupAcct,
} from '../store/reducers'
// action keys
import {
} from '../store/actions/'

class FileManagementContainer extends Component {
    render() {
        // toggle visibility
        let parentSelector = blockSelector(
            this.props.visible,
            'fileManagement_parentDiv fileManagement_parentDiv_closed',
            this.props.open,
            'fileManagement_parentDiv fileManagement_parentDiv_open'
        )
        let openButtonSelector = isVisible(
            ! this.props.open,
            'fileManagement_openButton'
        )
        let closeButtonSelector = isVisible(
            this.props.open,
            'fileManagement_closeButton'
        )

        let pSelector = isVisible(
            this.props.open,
            'fileManagement_p'
        )

        let backupButtonSelector = isVisible(
            this.props.open,
            'fileManagement_backupButton'
        )

        const parseDate = date => {
            // return human readable date
            return date
        }
        const latestBackup = () => {
            console.log(this.props.backupOptions)
            if (this.props.backupOptions) {
                return parseDate(
                    getLast( this.props.backupOptions.sort() )
                )
            }
            return 'no backups'
        }
        return(
            <div
                className={parentSelector} >
                <Button
                    click={this.props.openOptions}
                    prompt='file options'
                    selector={openButtonSelector} />
                <Button
                    click={this.props.closeOptions}
                    prompt='x'
                    selector={closeButtonSelector} />
                <p
                    className={pSelector} >
                    { latestBackup() }
                </p>
                <Button
                    click={this.props.backUpAcct}
                    prompt='back up acct'
                    selector={backupButtonSelector} />
            </div>
        )
    }
}

const mapState = state => {
    return {
        open: state.fileManagement.open,
        visible: state.fileManagement.visible,
        backupValue: state.fileManagement.selectedBackup,
        backupOptions: state.fileManagement.backupOptions,
    }
}

const mapDispatch = dispatch => {
    return {
        backupAcct: () => dispatch( backupAcct() ),
        openOptions: () => dispatch( openOptions() ),
        closeOptions: () => dispatch( closeOptions() ),
    }
}

export default connect(mapState, mapDispatch)(FileManagementContainer)
