import React, { Component } from 'react'
import { connect } from 'react-redux'
// library
import {
    subSelector,
    showIfTrue,
    blockSelector,
    getLast,
    getBEM,
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
        let {
            selector,
            open,
            backupOptions,
            openOptions,
            closeOptions,
            backupAcct,
            backupValue,
        } = this.props
        // toggle visibility
        let parentSelector = blockSelector(
            selector !== 'hidden',
            getBEM('fileManagement', 'parentDiv', 'closed'),
            open,
            getBEM('fileManagement', 'parentDiv', 'open')
        )
        let openButtonSelector = showIfTrue(
            ! open,
            'fileManagement_openButton'
        )
        let closeButtonSelector = showIfTrue(
            open,
            'fileManagement_closeButton'
        )

        let pSelector = showIfTrue(
            open,
            'fileManagement_p'
        )

        let backupButtonSelector = showIfTrue(
            open,
            'fileManagement_backupButton'
        )

        const parseDate = date => {
            // return human readable date
            return date
        }
        const latestBackup = () => {
            if (backupOptions) {
                return parseDate(
                    getLast( backupOptions.sort() )
                )
            }
            return 'no backups'
        }
        return(
            <div
                className={parentSelector} >
                <Button
                    click={openOptions}
                    prompt='file options'
                    selector={openButtonSelector} />
                <Button
                    click={closeOptions}
                    prompt='x'
                    selector={closeButtonSelector} />
                <p
                    className={pSelector} >
                    { latestBackup() }
                </p>
                <Button
                    click={backupAcct}
                    prompt='back up acct'
                    selector={backupButtonSelector} />
            </div>
        )
    }
}

const mapState = state => {
    return {
        open: state.fileManagement.open,
        selector: state.fileManagement.selector,
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
