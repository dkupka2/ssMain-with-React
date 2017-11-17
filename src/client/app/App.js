import React, { Component } from 'react'
import Pubsub from 'pubsub-js'
// styles
import './styles/App.css'
// components
import Radio from './components/generic/Radio.react'
import Select from './components/generic/Select.react'
import Input  from './components/generic/Input.react'
import Banner from './components/generic/Banner.react'
import Button from './components/generic/Button.react'
import Table  from './components/generic/Table.react'
// action keys and relay function
import events from './events'
const {
        ADD_ACCT,
        SELECT_ACCT,
        SELECT_TABLE,
    } = events.ui
// other dependancies
import { initialState } from './state/index'
import testData from './data'

// data tables
let tableTypes = ["table","filtered","compound"]
const tableKeys = Object.keys(events.loadTable)
const compoundKeys = Object.keys(events.multiTable)
const filterKeys = Object.keys(events.filterTable)
// global object for Pubsub events
let globalVar = {}
// props for account obj initialization
let newProps = []
for (let key of tableKeys) {
    newProps.push(key)
}
// confirms account number is valid
let verifyAccount = (acct) => {
    if ( acct % 1 === 0 && acct > 0 && acct < 10000 ) {
        // pubsub event
        Pubsub.publish(events.req.validation, acct)
        return true
    } else {
        return false
    }
}

const validateAcctInput = (val) => {
    let arr
    if (val) {
        arr = Array.from(val) // if length is valid and last char is a number
        if ( arr.length < 5 && ! isNaN( parseInt( arr[arr.length-1], 10 ) ) ) {
            return val.slice() // return string else return string without invalid char
        } else {
            return val.slice(0,val.length-1)
        }
    } else {
        return ""
    }
}

const selectOptions = (arr) => {
    let elems = []
    for (let el of arr) {
        elems.push(<option key={el.toString()} value={el}>{el}</option>)
    }
    return elems
}

const radioOptions = (arr, name, checked, func) => {
    console.log(checked, " should be checked")
    let elems = []
    for (let el of arr) {
        if (el === checked) {
            elems.push(<div key={el.toString()}><input type="radio" name={name} value={el} checked={true} onChange={func.bind(this)}/>{el}</div>)
        } else {
            elems.push(<div key={el.toString()}><input type="radio" name={name} value={el} onChange={func.bind(this)}/>{el}</div>)
        }
    }
    return elems
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    changeState(description, newState) {
        console.log(description)
        this.setState(newState)
    }
    
    flatAccts() { return Object.keys(this.state.accts) }
  
    handleAcctInputChange(x) {
        this.changeState("acct input changed", {acctInput: x})
    }

    handleAcctChange(x) {
        this.changeState("selected acct changed", {acctSelected: x})
    }

    handleTypeChange(x) {
        this.changeState("table changed", {
            tableType: x,
            tableSelected: this.whichTables(x)[0]
        })
    }

    handleTableChange(x) {
        let newPrompt = Number(this.state.acctSelected) > 0 ?
            "Please Load this table for the latest version" :
            "Please select an account first to load this table"
        this.changeState("table changed", {
            tableSelected: x,
            bannerType: "warning",
            bannerPrompt: newPrompt
        })
    }

    addAcct(x) {
        let newState = {}
        let newAccts = {}
        let prevAcctsList = this.flatAccts()
        if (prevAcctsList.includes(x)) return
        // if accts contains accounts, copy accts' enumerable
        if (prevAcctsList.length > 0) Object.assign(newAccts, this.state.accts)
        newAccts[x] = {}
        this.changeState("acct added", {
            accts: newAccts,
            acctSelected: x,
            acctInput: "",
            bannerType: "warning",
            bannerPrompt: "validating account, please wait"
        })
    }

    handleAcctQuery(x) { if ( verifyAccount(x) ) { this.addAcct(x) } }

    handleTableLoad() {
        let {acctSelected, tableSelected} = this.state
        if (acctSelected) {
            this.loadTable(acctSelected, tableSelected)
        } else {
            this.updateBanner({
                bannerType: "warning",
                bannerPrompt: "Please select an account first to load this table"
            })
        }
    }

    updateBanner(data) { this.changeState( "banner changed", data) }

    handleBannerClose() { this.setState({ bannerType: "hidden" }) }

    whichTables(x) {
        let type = x ? x : this.state.tableType
        console.log("type: ", type)
        switch (type) {
            case "filtered":
                return filterKeys
                break
            case "compound":
                return compoundKeys
                break
            default: 
                return tableKeys
        }
    }

    loadTable(acct, table) {
        console.log("requesting table: ", table)
        Pubsub.publish(events.actions.loadTable, { acct, table })
        this.updateBanner({
            bannerType: "warning",
            bannerPrompt: "Table is loading, please wait"
        })
    }

    checkConflicts() {
        let acct = this.state.acctSelected
        let checkTables = (table) => {
            if ( this.state.accts[acct][table].length > 0 ) return true
        }
        if ( this.state.tableSelected === "CONFLICTS" &&
            checkTables("AUTOA") && checkTables("AUTOB") )
        {
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
        this.updateBanner({
            bannerType: "ok",
            bannerPrompt: "Table is loaded, Good Luck!"
        })
    }

    componentWillMount() {
        globalVar.receiveRestRes = (event, data) => {
            // handle data returned from restAPI response
            console.log("received API response")
            this.handleRestRes(data)
        }

        Pubsub.subscribe(events.res.restApi, globalVar.receiveRestRes)

        globalVar.accountValidation = (event, data) => {
            let { acct, pass } = data
            let newAccts = {}
            let resultType, resultPrompt, resultSelected
            Object.assign(newAccts, this.state.accts)
            if (! pass) delete newAccts[acct]
            resultType = pass ? "ok" : "alert"
            resultPrompt = pass ? `Account ${acct} is ready` : `Account ${acct} not found in ordentry`
            resultSelected = pass ? acct : ""
            this.changeState("validation response received", {
                accts: newAccts,
                bannerType: resultType, 
                bannerPrompt: resultPrompt,
                acctSelected: resultSelected
            })
        }

        Pubsub.subscribe(events.res.validation, globalVar.accountValidation)

        globalVar.relayBackups = (event, data) => {
            console.log(data.data)
        }

        Pubsub.subscribe(events.res.backups, globalVar.relayBackups)
    }

    renderTable() {
        let tArr, dTable, data
        let acct = this.state.acctSelected
        let table = this.state.tableSelected
        // if a table is selected and the selected account has table data loaded
        if (this.state.accts[acct] !== undefined &&
            this.state.accts[acct][table] !== undefined &&
            this.state.accts[acct][table].length>0 )
        {
            tArr = this.state.accts[acct][table]
            data = tArr[tArr.length-1]
            try {
                dTable = tArr.length > 0 ? JSON.parse(data) : []
            }
            catch(e) {
                console.error(e)
                alert("render failed, check account number!")
                return
            }
            return (
                <Table selector="data" title={table} data={dTable}/>
            )
        } else {
            return
        }
    }

    render() {
        let {
            acctSelected,
            acctInput,
            tableType,
            tableSelected,
            bannerType,
            bannerPrompt,
        } = this.state

        let onChange = (e) => {
            console.log("valll!!", e.target.value)
        }

        let acctsArr = this.flatAccts()
        let accts = selectOptions(acctsArr)
        let tables = selectOptions( this.whichTables() )
        let radios = radioOptions(tableTypes, "tableType", tableType, onChange)

        return (
            <div className="App">
                <Input selector="acctInput" prompt="enter an account"
                 val={validateAcctInput(acctInput)}
                 onInputChange={this.handleAcctInputChange.bind(this)}
                 onInputSubmit={this.handleAcctQuery.bind(this)} />
                <Select val={acctSelected} selector="acctSelect"
                 prompt="select an account" options={accts}
                 onSelectChange={this.handleAcctChange.bind(this)} />
                <Radio selector="tableType" prompt="type of table: "
                 options={radios} onRadioChange={this.handleTypeChange.bind(this)} />
                <Select val={tableSelected} selector="tableSelect"
                 prompt="select a table" options={tables}
                 onSelectChange={this.handleTableChange.bind(this)} />
                <Button selector="loadTableBtn" prompt="load table"
                 onButtonClick={this.handleTableLoad.bind(this)} />
                <Banner type={bannerType} prompt={bannerPrompt}
                 selector="statusBanner"
                 onBannerClose={this.handleBannerClose.bind(this)} />
                <p>{acctsArr.length + " accts loaded, selected: "
                 + acctSelected + " " + tableSelected + " " + tableType}</p>
                {this.renderTable()}
            </div>
        )
    }
}

export default App