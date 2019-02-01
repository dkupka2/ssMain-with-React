import React, { Component } from "react";
import { connect } from "react-redux";
// library
import {
  hideOrGenCSSClass,
  showIfTrue,
  blockSelector,
  getLastElFrom2DArray,
  getBEM
} from "../services/";
// components
import { Button, Select } from "../components/";
// action creators
import { toggleOptions, backupAcct } from "../store/";

class FileManagementContainer extends Component {
  handleToggleOptions = () => {
    this.props.toggleOptions(this.props.open);
  };

  render() {
    let {
      selector,
      open,
      backupOptions,
      toggleOptions,
      backupAcct,
      backupValue
    } = this.props;
    // toggle visibility
    let parentSelector = blockSelector(
      selector !== "hidden",
      getBEM("fileManagement", "parentDiv", "closed"),
      open,
      getBEM("fileManagement", "parentDiv", "open")
    );
    let openButtonSelector = showIfTrue(!open, "fileManagement_openButton");
    let closeButtonSelector = showIfTrue(open, "fileManagement_closeButton");

    let pSelector = showIfTrue(open, "fileManagement_p");

    let backupButtonSelector = showIfTrue(open, "fileManagement_backupButton");

    const parseDate = date => {
      // return human readable date
      return date;
    };
    const latestBackup = () => {
      if (backupOptions) {
        return parseDate(getLastElFrom2DArray(backupOptions.sort()));
      }
      return "no backups";
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
