import React from 'react';

import Select from '../generic/Select.react'
import Button from '../generic/Button.react'

// widget componenet for file management

class FileManagement extends React.Component {
    constructor(props) {
        super(props)
    }
    handleBackupsClick() {
        alert(this.props.backups)
    }
    handleBackupClick() {
        this.props.backupRequest()
    }
    handleRestoreClick() {
        alert("restore")
    }
    render() {
        const { selector, backups } = this.props
        return (
            <div className={`${selector}-parentDiv`}>
                <p className={selector}>{prompt}</p>
                <Button selector={`${selector}-backup`} onButtonClick={this.handleBackupClick.bind(this)} prompt="backup files" />
                <Button selector={`${selector}-backups`} onButtonClick={this.handleBackupsClick.bind(this)} prompt="existing backups" />
                <Button selector={`${selector}-restore`} onButtonClick={this.handleRestoreClick.bind(this)} prompt="restore acct" />
            </div>
        )
    }
}

export default FileManagement