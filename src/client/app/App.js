import React, { Component } from 'react'
// import { applyMiddleware, combineReducers, createStore } from 'redux'
import Pubsub from 'pubsub-js'
// styles
import './styles/App.css'
// components
import Select from './components/Select.react'
import Input  from './components/Input.react'
import Banner from './components/Banner.react'
import Button from './components/Button.react'
import Table  from './components/Table.react'
// other dependancies
import events from './events'
import testData from './data'
// data tables
const eventKeys = Object.keys(events.loadTable)
const multiKeys = Object.keys(events.multiTable)
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
    flatAccts() { return Object.keys(this.state.accts) }

    constructor(props) {
        super(props)
        this.state = {
            acctInput: "",
            acctSelected: "",
            tableSelected: "",
            accts: {},
            bannerType: "",
            bannerPrompt: ""
        }
    }

    shouldComponentUpdate() {
        return true
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
        this.setAcctInput("")
        let acctsFlat = this.flatAccts()
        let newAccts = {}
        let newAcct = {}
        for (let prop of newProps) {
            newAcct[prop] = []
        }
        if (acctsFlat.includes(x)) {
            return
        }
        // if accts contains accounts, copy accts' enumerable
        if (acctsFlat.length > 0 ) {
            Object.assign(newAccts, this.state.accts)
        }
        newAccts[x] = newAcct
        this.setState({
            accts: newAccts,
            acctSelected: x
        })
    }

    handleAcctInputChange(x) {
        let arr
        if (x) {
            arr = Array.from(x)
        } else {
            this.setAcctInput("")
            return
        }
        // if the last character entered is a number
        if ( ! isNaN( parseInt( arr[arr.length-1], 10 ) ) ) {
            this.setAcctInput(x)
        }
    }

    handleAcctQuery(x) {
        if ( verifyAccount(x) ) {
            this.addAcct(x)
        }
    }

    handleBannerClose() {
        // toggle banner class / visibility
        Pubsub.publish("hide banner")
    }

    loadTable(acct, table) {
        console.log("requesting table: ", table)
        Pubsub.publish(events.actions.loadTable, { acct, table })
    }

    getConflictsData() {
        return {}
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
        globalVar.receiveRestRes = (event, data) => {
            // handle data returned from restAPI response
            console.log("received API response")
            this.handleRestRes(data)
        }

        Pubsub.subscribe(events.res.restApi, globalVar.receiveRestRes)
    }

    renderTable() {
        let acct = this.state.acctSelected
        let table = this.state.tableSelected
        if (acct && table) {
            if (!this.state.accts[acct][table]) this.state.accts[acct][table][0] = []
            this.loadTable(acct, table)
            let tArr = table ? this.state.accts[acct][table] : []
            let dTable = tArr.length > 0 ? JSON.parse(tArr[tArr.length-1]) : []
            if (table && table !== "CONFLICTS") {
                return (
                    <Table selector="data" title={table} data={dTable}/>
                )
            } else {
                if (this.checkConflicts() === true) {
                    let data = this.getConflictsData()
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
            eventKeys.concat(multiKeys)
        )
        let {
            acctSelected: selectedAcct,
            acctInput: acctInputVal,
            tableSelected: selectedTable,
        } = this.state
        let {bannerType, bannerPrompt} = this.state
        let returnTrue = () => true
        let returnConflicts = () => {
        }
        return (
            <div className="App">
                <Input selector="acctInput" prompt="enter an account"
                 val={acctInputVal}
                 onInputChange={this.handleAcctInputChange.bind(this)}
                 onInputSubmit={this.handleAcctQuery.bind(this)} />
                <Select val={selectedAcct} selector="acctSelect"
                 prompt="select an account" options={accts}
                 onSelectChange={this.handleAcctChange.bind(this)} />
                <Select val={selectedTable} selector="tableSelect"
                 prompt="select a table" options={tables}
                 onSelectChange={this.handleTableChange.bind(this)} />
                <Banner type={bannerType} prompt={bannerPrompt}
                 selector="statusBanner"
                 onBannerClose={this.handleBannerClose.bind(this)} />
                <p>{acctsArr.length + " accts loaded, selected: "
                 + selectedAcct + " " + selectedTable}</p>
                {this.renderTable()}
            </div>
        )
    }
}

export default App