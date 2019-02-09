import React, { Component } from 'react';
import { connect } from 'react-redux';
// library
import {
  showIfTrue,
  getLastElFrom2DArray,
  generateBEMSelector
} from '../services/';
// components
import { Button } from '../components/';
// action creators
import { toggleOptions, backupAcct } from '../store/';

class FileManagementContainer extends Component {
  handleToggleOptions = () => {
    this.props.toggleOptions(this.props.open);
  };

  render() {
    let { selector, open, backupOptions, backupAcct } = this.props;

    // toggle visibility
    let parentSelector =
      selector !== 'hidden'
        ? generateBEMSelector('fileManagement', 'parentDiv', 'closed')
        : showIfTrue(
            open,
            generateBEMSelector('fileManagement', 'parentDiv', 'open')
          );
    let openButtonSelector = showIfTrue(!open, 'fileManagement_openButton');
    let closeButtonSelector = showIfTrue(open, 'fileManagement_closeButton');
    let pSelector = showIfTrue(open, 'fileManagement_p');
    let backupButtonSelector = showIfTrue(open, 'fileManagement_backupButton');

    const parseDate = date => {
      // todo - return human readable date
      return date;
    };
    const latestBackup = () => {
      if (backupOptions) {
        return parseDate(getLastElFrom2DArray(backupOptions.sort()));
      }
      return 'no backups';
    };

    return (
      <div className={parentSelector}>
        <Button
          click={this.handleToggleOptions}
          prompt="file options"
          selector={openButtonSelector}
        />
        <Button
          click={this.handleToggleOptions}
          prompt="x"
          selector={closeButtonSelector}
        />
        <p className={pSelector}>{latestBackup()}</p>
        <Button
          click={backupAcct}
          prompt="back up acct"
          selector={backupButtonSelector}
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    open: state.fileManagement.open,
    selector: state.fileManagement.selector,
    backupValue: state.fileManagement.selectedBackup,
    backupOptions: state.fileManagement.backupOptions
  };
};

const mapDispatch = dispatch => {
  return {
    backupAcct: () => dispatch(backupAcct()),
    toggleOptions: open => dispatch(toggleOptions(open))
  };
};

export default connect(
  mapState,
  mapDispatch
)(FileManagementContainer);
