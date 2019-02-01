import React, { Component } from "react";
import { connect } from "react-redux";
import { validateAcctNumberInput } from "../services/";
import { socket } from "../store/socket";
import { Input } from "../components";
import {
  // event keys
  SUBMIT_ACCT_INPUT,
  // action creators
  submitAcct
} from "../store/";
// reducer
class AcctInputContainer extends Component {
  state = {
    inputValue: ""
  };

  handleInputChange = e => {
    this.setState({ inputValue: validateAcctNumberInput(e.target.value) });
  };
  handleInputSubmit = () => {
    this.setState({ inputValue: "" });
    this.props.submit(this.state.inputValue);
  };

  render() {
    return (
      <div>
        <Input
          prompt="Enter an Account #:"
          selector="acctInput"
          value={this.state.inputValue}
          change={this.handleInputChange}
          submit={this.handleInputSubmit}
          message={this.props.message}
          messageSelector={this.props.messageClass}
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    message: state.acctInput.message,
    messageClass: state.acctInput.messageClass
  };
};

const mapDispatch = dispatch => {
  return {
    submit: value => dispatch(submitAcct(value))
  };
};

export default connect(
  mapState,
  mapDispatch
)(AcctInputContainer);
