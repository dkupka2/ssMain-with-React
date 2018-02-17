import React, { Component } from 'react'
// containers
import Test from './container/Test.container'
import AcctInput from './container/AcctInput.container'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <Test />
                <AcctInput />
            </div>
        )
    }
}

export default App