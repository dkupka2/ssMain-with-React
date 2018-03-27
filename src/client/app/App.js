import React, { Component } from 'react'
// containers
import { 
    AcctInputContainer,
    AcctsContainer,
    TableOptionsContainer,
    DataTableContainer,
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
                <TableOptionsContainer />
                <DataTableContainer />
            </div>
        )
    }
}

export default App
