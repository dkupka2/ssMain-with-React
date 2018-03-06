import React, { Component } from 'react'
// containers
import AcctInput from './container/AcctInput.container'
import Accts from './container/Accts.container'
import TableOptions from './container/TableOptions.container'
import DataTable from './container/DataTable.container'

import './styles/App.css'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <AcctInput />
                <Accts />
                <TableOptions />
                <DataTable />
            </div>
        )
    }
}

export default App
