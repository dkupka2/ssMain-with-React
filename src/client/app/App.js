import React, { Component } from 'react';
// containers
import {
  AcctInputContainer,
  AcctsContainer,
  TableOptionsContainer,
  DataTableContainer,
  SocketContainer
} from './containers';

import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AcctInputContainer />
        <AcctsContainer />
        <TableOptionsContainer />
        <DataTableContainer />
        <SocketContainer />
      </div>
    );
  }
}

export default App;
