import React, { Component } from 'react'
// containers
import AcctInput from './container/AcctInput.container'
import Accts from './container/Accts.container'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <AcctInput />
                <Accts />
            </div>
        )
    }
}

export default App