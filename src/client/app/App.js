import React, { Component } from 'react'
// containers
import AcctInput from './container/AcctInput.container'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <AcctInput />
            </div>
        )
    }
}

export default App