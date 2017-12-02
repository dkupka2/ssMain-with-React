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
import FileManagement from './components/widgets/FileManagement.widget'
// observer methods and event keys
import events from './events'
const { ADD_ACCT, SELECT_ACCT, SELECT_TABLE, } = events.ui
// other dependencies
import { initialState } from './state/index'
import { filter } from './facades/dataTable.facade'
// data tables
const tableTypes = ["conflicts", "table","filtered"]
const tableKeys = Object.keys(events.loadTable)
const conflictsKeys = Object.keys(events.multiTable)
const filterKeys = Object.keys(events.filterTable)
// anchor for Pubsub events
let globalVar = {} 

let verifyAccount = (acct) => { // confirms account number is valid
    if ( acct % 1 === 0 && acct > 0 && acct < 10000 ) {
        Pubsub.publish(events.req.validation, acct)
        return true
    } else return false
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
    } else return ""
}

const selectOptions = (arr) => {
    let elems = []
    for (let el of arr) {
        elems.push(<option key={el.toString()} value={el}>{el}</option>)
    }
    return elems
}

const radioOptions = (arr, name, checked) => {
    let elems = []
    for (let el of arr) {
        elems.push(<div key={el.toString()}><input type="radio" name={name} value={el} checked={el === checked} readOnly={el === checked}/>{el}</div>)
    }
    return elems
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    changeState(description, newState) {
        this.setState(newState)
    }
    
    flatAccts() { return Object.keys(this.state.accts) }
  
    handleBackupChange(x) {
        this.changeState("backups received", {
            fileManagement: Object.assign({}, this.state.fileManagement, {selectedBackup: x})
        })
    }

    handleAcctInputChange(x) {
        this.changeState("acct input changed", {acctInput: x})
    }

    handleAcctChange(x) {
        this.changeState("selected acct changed", {acctSelected: x, bannerPrompt: `Account ${x} is ready`})
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
        let {acctSelected, tableSelected, tableType} = this.state
        if (acctSelected) {
            this.loadTable(acctSelected, tableSelected, tableType)
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
        switch (type) {
            case "filtered":
                return filterKeys
                break
            case "conflicts":
                return conflictsKeys
                break
            default: 
                return tableKeys
        }
    }

    loadTable(acct, table, type) {
        Pubsub.publish(events.actions.loadTable, { acct, table, type })
        this.updateBanner({
            bannerType: "warning",
            bannerPrompt: "Table is loading, please wait"
        })
    }

    handleRestRes(data) {
        let { acct, body, table } = data
        console.log(body)
        // if the table does not exist in the slected account add empty arr
        if (!this.state.accts[acct][table]) this.state.accts[acct][table] = []
        this.state.accts[acct][table].push([body]) //  cache table
        this.updateBanner({
            bannerType: "ok",
            bannerPrompt: "Table is loaded, Good Luck!"
        })
    }

    componentWillMount() {

        globalVar.receiveRestRes = (event, data) => {
            this.handleRestRes(data)
        }
        Pubsub.subscribe(events.res.restApi, globalVar.receiveRestRes)

        globalVar.accountValidation = (event, data) => {
            let { acct, pass } = data
            let resultType, resultPrompt, resultSelected, newAccts = {}
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
            this.changeState("backups received", {
                fileManagement: Object.assign({}, this.state.fileManagement, {backups: data.data})
            })
        }
        Pubsub.subscribe(events.res.backups, globalVar.relayBackups)

        globalVar.requestBackup = (acct = this.state.acctSelected) => {
            Pubsub.publish(events.req.backup, acct)
        }

        globalVar.handleError = (error) => {
            this.updateBanner({
                bannerType: "alert",
                bannerPrompt: error
            })
        }
        Pubsub.subscribe(events.res.error, globalVar.handleError)
    }

    renderTable() {
        let tArr, dTable, data
        let acct = this.state.acctSelected
        let table = this.state.tableSelected
        // if a table is selected and the selected account has table data loaded
        if ( this.state.accts[acct] !== undefined &&
             this.state.accts[acct][table] !== undefined &&
             this.state.accts[acct][table].length > 0 )
        {
            tArr = this.state.accts[acct][table]
            data = tArr[tArr.length-1]
            try {
                dTable = tArr.length > 0 ? JSON.parse(data) : []
            }
            catch(e) {
                console.error(e)
                return alert("render failed, error: ", e)
            }
            return dTable.length > 0 ? // render table or inform if there is no data
                ( <Table selector="data" title={table} data={dTable}/> ) : 
                ( <p className="no-table-data">We're Sorry, Your Data Is In Another Table</p> )
        } else return
    }

    render() {
        let {
            acctSelected,
            acctInput,
            tableType,
            tableSelected,
            bannerType,
            bannerPrompt,
            fileManagement
        } = this.state

        let {
            backups, selectedBackup, showBackups
        } = this.state.fileManagement

        let tern = (arg) => arg ? true : false
        let backupOptions = backups ? selectOptions(backups) : []
        let acctsArr = this.flatAccts()
        let accts = selectOptions(acctsArr)
        let tables = selectOptions( this.whichTables() )
        let radios = radioOptions(tableTypes, "tableType", tableType)
        let tableSelector = acctSelected ? "tableType" : "hidden"
        let buttonSelector = acctSelected ? "loadTableBtn" : "hidden"

        return (
            <div className="App">
                <Input selector="acctInput" prompt="enter an account"
                 val={validateAcctInput(acctInput)}
                 onInputChange={this.handleAcctInputChange.bind(this)}
                 onInputSubmit={this.handleAcctQuery.bind(this)} />
                <Select val={acctSelected} selector="acctSelect"
                 prompt="select an account" options={accts}
                 onSelectChange={this.handleAcctChange.bind(this)} />
                <FileManagement selector="fileManagement" backupRequest={globalVar.requestBackup}
                 selectedBackup={this.handleBackupChange.bind(this)}
                 backupOptions={backupOptions} backups={backups}
                 acctSelected={tern(acctSelected)} showBackups={showBackups} />
                <Radio selector={tableSelector} prompt="type of table:"
                 options={radios} onRadioChange={this.handleTypeChange.bind(this)} />
                <Select val={tableSelected} selector="tableSelect"
                 prompt="select a table" options={tables}
                 onSelectChange={this.handleTableChange.bind(this)} />
                <Button selector={buttonSelector} prompt="load table"
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