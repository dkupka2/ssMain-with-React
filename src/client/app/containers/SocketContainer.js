import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket } from '../store/socket';
import {
  // action creators
  restResponse,
  restError,
  validateClient,
  // action keys
  SUBMIT_ACCT_INPUT,
  RESPONSE_VALIDATE_CLIENT,
  RESPONSE_RESTAPI,
  PARSE_ERROR,
  REST_ERROR
} from '../store/';
// reducer
class SocketContainer extends Component {
  componentWillMount() {
    socket.on(RESPONSE_VALIDATE_CLIENT, data => {
      this.props.validateClient(data);
    });
    socket.on(RESPONSE_RESTAPI, data => {
      let payload = {
        acct: data.acct,
        resTable: data.table,
        data: JSON.parse(data.body),
        accts: this.props.accts,
        view: this.props.table
      };
      this.props.restResponse(payload);
    });
    socket.on(PARSE_ERROR, e => {
      this.props.restError('error parsing response from RestAPI server');
    });
    socket.on(REST_ERROR, e => {
      this.props.restError('error response from RestAPI server');
    });
  }

  render() {
    return <div className="hidden" />;
  }
}

const mapState = state => {
  return {
    accts: state.accts.accts,
    table: state.tableOptions.table
  };
};

const mapDispatch = dispatch => {
  return {
    validateClient: payload => dispatch(validateClient(payload)),
    restResponse: payload => restResponse(payload)(dispatch),
    restError: payload => dispatch(restError(payload))
  };
};

export default connect(
  mapState,
  mapDispatch
)(SocketContainer);
