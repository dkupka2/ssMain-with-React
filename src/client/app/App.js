import React, { Component } from 'react'
// containers
import {
    AcctInputContainer,
    AcctsContainer,
    TableOptionsContainer,
    DataTableContainer,
    SocketContainer,
    FileManagementContainer,
} from './containers'

import './styles/App.css'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <AcctInputContainer />
                <AcctsContainer />
                { /* <FileManagementContainer /> */ }
                <TableOptionsContainer />
                <DataTableContainer />
                <SocketContainer />
            </div>
        )
    }
}

export default App
