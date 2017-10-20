import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pubsub from 'pubsub-js'
// styles
import './styles/App.css'
// components
import Select from './components/generic/Select.react'
import Input  from './components/generic/Input.react'
import Banner from './components/generic/Banner.react'
import Button from './components/generic/Button.react'
import Table  from './components/generic/Table.react'
// redux
import store from './store/index'
// action keys and relay function
import actions from './actions/'
const {
        SELECT_ACCOUNT,
        ADD_ACCOUNT,
        relay
    } = actions
// other dependancies
import { initialState } from './state/index'
import events from './events'
import testData from './data'
import { validateAcctInput } from './components/validateAcctInput.mixin'
// data tables
const eventKeys = Object.keys(events.loadTable)
const multiKeys = Object.keys(events.multiTable)
const filterKeys = Object.keys(events.filterTable)
// global object for Pubsub events
let globalVar = {}
// props for account obj initialization
let newProps = []
for (let key of eventKeys) {
    newProps.push(key)
}
// confirms account number is valid
let verifyAccount = (acct) => {
    if ( acct % 1 === 0 && acct > 0 && acct < 10000 ) {
        // still needs pubsub event
        return true
    } else {
        return false
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.state
    }
    
    flatAccts() {
        if (this.state && this.state.accts.length > 0) {
            return Object.keys(this.state.accts)
        } else {
            return []
        }
    }

    shouldComponentUpdate() {
        // let response = true
        // if (this.state.pending === true) response = false
        // return response
        return true
    }
  
    handleAcctInputChange(x) {
        this.setState( {acctInput: x})
    }

    setAcctInput(x) {
        this.setState( {acctInput: x} )
    }

    handleAcctChange(x) {
        this.setState( {acctSelected: x} )
    }

    handleTableChange(x) {
        this.setState( {tableSelected: x} )
    }
  
    makeElems(arr) {
        let newElems = []
        for (let val of arr) {
            newElems.push(<option key={val.toString()} value={val}>{val}</option>)
        }
        return newElems
    }

    addAcct(x) {
        store.dispatch({type: ADD_ACCOUNT, payload: x})
    }

    handleAcctQuery(x) {
        if ( verifyAccount(x) ) {
            this.addAcct(x)
        }
    }

    handleBannerChange(data) {
        // toggle banner className / message
        let {type, prompt} = data
        this.setState({
            bannerType: type,
            bannerPrompt: prompt
        })
    }

    handleBannerClose() {
        this.setState({
            bannerType: "hidden"
        })
    }

    loadTable(acct, table) {
        console.log("requesting table: ", table)
        Pubsub.publish(events.actions.loadTable, { acct, table })
    }

    getConflictsData() {
        return true
    }

    checkConflicts() {
        let acct = this.state.acctSelected
        let checkTables = (table) => {
            if ( this.state.accts[acct][table].length > 0 ) return true
        }
        if (
            this.state.tableSelected === "CONFLICTS" &&
            checkTables("AUTOA") &&
            checkTables("AUTOB")
        ) {
            return true
        }
    }

    handleRestRes(data) {
        let { acct, body, table } = data
        console.log("table is: ", table)
        if (!this.state.accts[acct][table]) {
            this.state.accts[acct][table] = []
        }
        this.state.accts[acct][table].push([body])
    }

    componentWillMount() {
        store.subscribe(() => {
            var state = store.getState()
            this.setState({ state })
        })

        globalVar.receiveRestRes = (event, data) => {
            // handle data returned from restAPI response
            console.log("received API response")
            this.handleRestRes(data)
        }

        Pubsub.subscribe(events.res.restApi, globalVar.receiveRestRes)

        globalVar.updateBanner = (event, data) => {
            this.handleBannerUpdate(data)
        }

        Pubsub.subscribe(events.banner.update, globalVar.updateBanner)
    }

    renderTable() {
        let acct = this.state.acctSelected
        let table = this.state.tableSelected
        if (acct && table) {
            let tArr, dTable, data
            if (!this.state.accts[acct][table]) this.state.accts[acct][table][0] = []
            this.loadTable(acct, table)
            tArr = table ? this.state.accts[acct][table] : []
            data = tArr[tArr.length-1]
            try {
                dTable = tArr.length > 0 ? JSON.parse(data) : []
            }
            catch(e) {
                console.log(data[0].error)
                return
            }
            if (table && table !== "CONFLICTS") {
                return (
                    <Table selector="data" title={table} data={dTable}/>
                )
            } else {
                if (this.checkConflicts() === true) {
                    data = this.getConflictsData()
                    return (
                        <Table selector="conflicts" title="conflicts data" data={data}/>
                    )
                }
            }
        }
    }

    render() {
        let acctsArr = this.flatAccts()
        let accts = this.makeElems(acctsArr)
        let tables = this.makeElems( 
            eventKeys.concat(multiKeys).concat(filterKeys)
        )
        let {
            acctSelected,
            acctInput,
            tableSelected,
            bannerType,
            bannerPrompt
        } = this.state

        return (
            <div className="App">
                <Input selector="acctInput" prompt="enter an account"
                 val={validateAcctInput(acctInput)}
                 onInputChange={this.handleAcctInputChange.bind(this)}
                 onInputSubmit={this.handleAcctQuery.bind(this)} />
                <Select val={acctSelected} selector="acctSelect"
                 prompt="select an account" options={accts}
                 />
                <Select val={tableSelected} selector="tableSelect"
                 prompt="select a table" options={tables}
                 onSelectChange={this.handleTableChange.bind(this)} />
                <Banner type={bannerType} prompt={bannerPrompt}
                 selector="statusBanner"
                 onBannerClose={this.handleBannerClose.bind(this)} />
                <p>{acctsArr.length + " accts loaded, selected: "
                 + acctSelected + " " + tableSelected}</p>
                {this.renderTable()}
            </div>
        )
    }
}

// const mapStatetoProps = (store) => {
//     return {
//         accts: store.accts,
//         acctSelected: store.acctSelected
//     }   
// }

// export default connect(mapStatetoProps)(App)

export default App