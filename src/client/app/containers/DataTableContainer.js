import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// library
import { showIfTrue } from '../services';
import {
  // action creators
  checkCache_curry,
  // event keys
  LOAD_TABLE,
  RESPONSE_RESTAPI
} from '../store/';

class DataTableContainer extends Component {
  render() {
    return (
      <div className={showIfTrue(this.props.visible, 'dataTable')}>
        <ReactTable
          filterable
          data={this.props.data}
          columns={this.props.columns}
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    data: state.dataTable.tableData,
    columns: state.dataTable.columns,
    visible: state.dataTable.visible
  };
};

const mapDispatch = dispatch => {
  return {
    checkCache_curry: data => dispatch(checkCache_curry(data))
  };
};

export default connect(
  mapState,
  mapDispatch
)(DataTableContainer);
