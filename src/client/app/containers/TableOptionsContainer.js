import React, { Component } from "react";
import { connect } from "react-redux";
import { socket } from "../store/socket";
// library
import { selectOptions, showIfTrue } from "../services/";
import { Select, Button } from "../components/";
import {
  // action creators
  changeTable,
  changeType,
  restRequest,
  restResponse,
  // action keys
  RESPONSE_RESTAPI,
  tables
} from "../store/";
let { getTables } = tables;
// reducer
class AcctsContainer extends Component {
  state = {
    types: ["compound", "local", "global"],
    tables: getTables(this.props.type),
    visible: false
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      visible: (newProps.accts && newProps.accts.length > 0)
        ? true
        : false
    });
  }

  handleTypeChange = e => {
    this.setState({ tables: getTables(e.target.value) });
    this.props.changeType({
      type: e.target.value,
      acct: this.props.selectedAcct,
      accts: this.props.accts,
      view: tables.default[e.target.value]
    });
  };
  handleTableChange = e => {
    this.props.changeTable({
      type: this.props.type,
      acct: this.props.selectedAcct,
      accts: this.props.accts,
      view: e.target.value
    });
  };
  handleTableLoad = () => {
    this.props.restRequest({
      acct: this.props.selectedAcct,
      type: this.props.type,
      view: this.props.table
    });
  };

  render() {
    return (
      <div className={showIfTrue(this.state.visible, "tableOptions")}>
        <Select
          selector="tableOptions_type"
          prompt="Type of Table: "
          value={this.props.type}
          options={selectOptions(this.state.types)}
          change={this.handleTypeChange}
        />
        <Select
          selector="tableOptions_table"
          prompt="Which Table: "
          value={this.props.table}
          options={selectOptions(this.state.tables)}
          change={this.handleTableChange}
        />
        <div className="tableOptions_messageDiv">
          <Button
            selector="tableOptions_submit"
            prompt="load table"
            click={this.handleTableLoad}
          />
          <p className={this.props.messageClass}>{this.props.message} </p>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    type: state.tableOptions.type,
    table: state.tableOptions.table,
    message: state.tableOptions.message,
    messageClass: state.tableOptions.messageClass,
    // state from accts reducer
    accts: state.accts.accts,
    selectedAcct: state.accts.selectedAcct
  };
};

const mapDispatch = dispatch => {
  return {
    loadCache: data => dispatch(loadCache(data)),
    changeType: data => dispatch(changeType(data)),
    changeTable: data => dispatch(changeTable(data)),
    restRequest: data => dispatch(restRequest(data)),
    restResponse: data => dispatch(restResponse(data))
  };
};

export default connect(
  mapState,
  mapDispatch
)(AcctsContainer);
