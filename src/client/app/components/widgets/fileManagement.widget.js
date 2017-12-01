import React from 'react';

import Select from '../generic/Select.react'
import Button from '../generic/Button.react'

// widget componenet for file management

class FileManagement extends React.Component {
    constructor(props) {
        super(props)
    }
    handleManageClick() {
        alert(this.props.backups)
    }
    handleBackupClick() {
        this.props.backupRequest()
    }
    handleRestoreClick() {
        alert("restore")
    }
    handleSelectChange() {
        this.props.selectedBackUp()
    }
    render() {
        const { selector, selectedBackup, backupOptions, acctSelected, showBackups } = this.props
        return (
            <div className={acctSelected? `${selector}-parentDiv` : "hidden"}>
                <p className={selector}>{prompt}</p>
                <Button selector={acctSelected? `${selector}-backup` : "hidden"}
                 onButtonClick={this.handleBackupClick.bind(this)} prompt="backup" />
                <Button selector={acctSelected? `${selector}-manage` : "hidden"}
                 onButtonClick={this.handleManageClick.bind(this)} prompt="manage" />
                <Button selector={acctSelected? `${selector}-restore` : "hidden"}
                 onButtonClick={this.handleRestoreClick.bind(this)} prompt="restore" />
                <Select selector={showBackups? `${selector}-restoreSelect` : "hidden"}
                 onSelectChange={this.handleSelectChange.bind(this)}
                 prompt="select backup" options={backupOptions} val={selectedBackup} />
            </div>
        )
    }
}

export default FileManagement