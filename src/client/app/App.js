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
import validateAcctInput from './mixins/acctInputValidation.mixin'
import selectOptions from './mixins/select.mixin'
import radioOptions from './mixins/radio.mixin'
// data tables
const tableTypes = ["conflicts", "table","filtered"]
const tableKeys = Object.keys(events.loadTable)
const conflictsKeys = Object.keys(events.multiTable)
const filterKeys = Object.keys(events.filterTable)
// anchor for Pubsub events
let globalVar = {} 
// confirms account number is valid
let verifyAccount = (acct) => { 
    if ( acct % 1 === 0 && acct > 0 && acct < 10000 ) {
        Pubsub.publish(events.req.validation, acct)
        return true
    } else return false
}
// App class
class App extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    // invokes setState
    changeState(description, newState) {
        // console.log(description)
        this.setState(newState)
    }
    // returns flat array of loaded accts
    flatAccts() { return Object.keys(this.state.accts) }
    // updates state when backups received
    handleBackupChange(x) {
        this.changeState("backups received", {
            fileManagement: Object.assign({}, this.state.fileManagement, {selectedBackup: x})
        })
    }
    // handles acct input updates
    handleAcctInputChange(x) {
        this.changeState("acct input changed", {acctInput: x})
    }
    // handles acct select updates
    handleAcctChange(x) {
        this.changeState("selected acct changed", {acctSelected: x, bannerPrompt: `Account ${x} is ready`})
    }
    // handles acct type select updates
    handleTypeChange(x) {
        this.changeState("table changed", {
            tableType: x,
            tableSelected: this.whichTables(x)[0]
        })
    }
    // handles table select updates
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
    // verifies and adds account, if accts contains data; copy it's enumerable
    handleAcctQuery(x) {
        if (! verifyAccount(x) ) return
        let newAccts = {}
        let prevAcctsList = this.flatAccts()
        if (prevAcctsList.includes(x)) return
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
    // loads table or reports if no table is selected
    handleTableLoad() {
        let {acctSelected, tableSelected, tableType} = this.state
        if (acctSelected) {
            Pubsub.publish(events.actions.loadTable, { acctSelected, tableSelected, tableType })
            this.updateBanner({
                bannerType: "warning",
                bannerPrompt: "Table is loading, please wait"
            })
        } else {
            this.updateBanner({
                bannerType: "warning",
                bannerPrompt: "Please select an account first to load this table"
            })
        }
    }
    // *convenience methods for banner updates*
    updateBanner(data) { this.changeState( "banner changed", data) }
    handleBannerClose() { this.setState({ bannerType: "hidden" }) }
    // returns tables array based on tableType
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
    // handles RestAPI response
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
    // global functions for Pubsub
    componentWillMount() {
        // relay RestAPI response to App class instance
        globalVar.receiveRestRes = (event, data) => {
            this.handleRestRes(data)
        }
        Pubsub.subscribe(events.res.restApi, globalVar.receiveRestRes)
        // handles account validation response and updates state
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
        // handles back up subdirectory list response and updates state
        globalVar.relayBackups = (event, data) => {
            this.changeState("backups received", {
                fileManagement: Object.assign({}, this.state.fileManagement, {backups: data.data})
            })
        }
        Pubsub.subscribe(events.res.backups, globalVar.relayBackups)
        // relays back up subdirectory request
        globalVar.requestBackup = (acct = this.state.acctSelected) => {
            Pubsub.publish(events.req.backup, acct)
        }
        // handles errors from the server and updates state
        globalVar.handleError = (error) => {
            this.updateBanner({
                bannerType: "alert",
                bannerPrompt: error
            })
        }
        Pubsub.subscribe(events.res.error, globalVar.handleError)
    }
    // renders table or inform if there is no data
    renderTable() {
        let tArr, dTable, data
        let acct = this.state.acctSelected
        let table = this.state.tableSelected
        // "if a table is selected and the selected account has table data loaded"
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
            return dTable.length > 0 ? 
                ( <Table selector="data" title={table} data={dTable}/> ) : 
                ( <p className="no-table-data">There is no data in the selected table</p> )
        } else return
    }
    // App class instance' render function
    render() {
        // variables from state
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
        // more values needed for subcomponent props
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