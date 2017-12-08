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
import events from './events/events'
import { keys } from './events/keys'
const { ADD_ACCT, SELECT_ACCT, SELECT_TABLE } = keys.ui
// other dependencies
import { initialState } from './state/index'
import filterTable from './facades/filterTable/filterTable.facade'
import validateAcctInput from './mixins/acctInputValidation.mixin'
import selectOptions from './mixins/select.mixin'
import radioOptions from './mixins/radio.mixin'
// data tables
const tableTypes = ["compound", "local", "global"]
const localKeys = Object.keys(keys.tables.local)
const globalKeys = Object.keys(keys.tables.global)
const compoundKeys = Object.keys(keys.tables.compound)
// concat conflict keys to target for rendering
const conflictTables = Object.keys(keys.tables.compound.conflicts).concat(globalKeys)
// anchor for Pubsub events
let globalVar = {} 
// confirms account number is valid
let verifyAccount = (acct) => { 
    if ( acct % 1 === 0 && acct > 0 && acct < 10000 ) {
        Pubsub.publish(keys.req.validation, acct)
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
    handleTableChange(newTable) {
        let type, prompt
        let { acctSelected, accts } = this.state
        if (! acctSelected) {
            this.changeState("table changed - no acct selected", {
                bannerType: "warning",
                bannerPrompt: "Please select an account first to load this table"
            })
        }
        if ( acctSelected && accts[acctSelected][newTable].length === 0 ) {
            type = "ok"
            prompt = "Table is ready to load"
        } else {
            type = "warning"
            prompt = "Please re-load this table for the latest version"
        }
        this.changeState("table changed", {
            tableSelected: newTable,
            bannerType: type,
            bannerPrompt: prompt
        })
    }
    // verifies and adds account, if accts contains data; copy it's enumerable
    handleAcctQuery(acctNum) {
        let accts
        if (! verifyAccount(acctNum) ) return
        if (this.flatAccts().includes(acctNum)) return
        accts = Object.assign({}, this.state.accts)
        accts[acctNum] = {}
        localKeys.concat(globalKeys).map((table) => accts[acctNum][table] = [])
        this.changeState("acct added", {
            accts: accts,
            acctSelected: acctNum,
            acctInput: "",
            bannerType: "warning",
            bannerPrompt: "validating account, please wait"
        })
    }
    // loads table or reports if no table is selected
    handleTableLoad() {
        let { acctSelected, tableSelected, tableType } = this.state
        if (! acctSelected) {
            this.updateBanner({
                bannerType: "warning",
                bannerPrompt: "Please enter an account first to load this table"
            })
        } else{
            Pubsub.publish(keys.actions.loadTable, { acctSelected, tableSelected, tableType })
            this.updateBanner({
                bannerType: "warning",
                bannerPrompt: "Table is loading, please wait"
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
            case "global":
                return globalKeys
                break
            case "compound":
                return compoundKeys
                break
            default:
                return localKeys
        }
    }
    // handles RestAPI response and caches table
    handleRestRes(data) {
        let { acct, body, table } = data
        this.state.accts[acct][table].push([body])
        this.updateBanner({
            bannerType: "ok",
            bannerPrompt: "Table is loaded, Good Luck!"
        })
    }
    // global functions for Pubsub
    componentWillMount() {
        // receives RestAPI response to App
        globalVar.receiveRestRes = (event, data) => {
            this.handleRestRes(data)
        }
        Pubsub.subscribe(keys.res.restApi, globalVar.receiveRestRes)
        // handles account validation response and updates state
        globalVar.accountValidation = (event, data) => {
            let resultType, resultPrompt, resultSelected,
                { acct, pass } = data
            let newAccts = Object.assign({}, this.state.accts)
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
        Pubsub.subscribe(keys.res.validation, globalVar.accountValidation)
        // handles back up subdirectory list response and updates state
        globalVar.relayBackups = (event, data) => {
            this.changeState("backups received", {
                fileManagement: Object.assign({}, this.state.fileManagement, {backups: data.data})
            })
        }
        Pubsub.subscribe(keys.res.backups, globalVar.relayBackups)
        // relays back up request
        globalVar.requestBackup = (acct = this.state.acctSelected) => {
            Pubsub.publish(keys.req.backup, acct)
        }
        // handles errors from the server and updates state
        globalVar.handleError = (event, error) => {
            console.log("error")
            this.updateBanner({
                bannerType: "alert",
                bannerPrompt: error
            })
        }
        Pubsub.subscribe(keys.res.error, globalVar.handleError)
    }
    getCompoundTables(type, acct) {
        let dArr, data = [],
            accts = this.state.accts
        if (type === "conflicts") {
            conflictTables.map((table) => {
                dArr = accts[acct][table]
                data.push(dArr ? dArr[dArr.length-1] : false)
            })
        }
        return data.includes(false) ? false : data
    }
    // renders table or informs if there is no data
    renderTable() {
        let tArr, dTable, data, proceed,
            accts = this.state.accts,
            table = this.state.tableSelected,
            acct = this.state.acctSelected,
            type = this.state.tableType
        if ( acct === undefined ) return
        // "if a local or global table is selected and the selected account has table data loaded"
        if (
            ( type === "local" || type === "global" ) &&
            accts[acct][table] !== undefined &&
            accts[acct][table].length > 0 
        ) {
            proceed = true
            tArr = accts[acct][table]
            data = tArr[tArr.length-1]
        }
        // "if conflicts is selected "
        if ( table === "conflicts" && this.getCompoundTables(acct, table) ) {
            data = this.getCompoundTables(acct, table)
        } 
        if (! proceed) return
        try {
            data = JSON.parse(data)
            console.log(data)
            dTable = filterTable(table, data, this.state.tableType)
        }
        catch(e) {
            console.error(e)
            return alert("render failed, error: ", e)
        } 
        return dTable.length > 0 ? 
            ( <Table selector="data" title={table} data={dTable}/> ) :
            ( <p className="no-table-data">There is no data in the selected table</p> )
    }
    // App class instance' render function
    render() {
        // values from state
        let {
            acctSelected,
            acctInput,
            tableType,
            tableSelected,
            bannerType,
            bannerPrompt,
            fileManagement
        } = this.state
        let { backups, selectedBackup, showBackups } = fileManagement
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
                 val={ validateAcctInput(acctInput) }
                 onInputChange={ this.handleAcctInputChange.bind(this) }
                 onInputSubmit={ this.handleAcctQuery.bind(this) } />
                <Select val={acctSelected} selector="acctSelect"
                 prompt="select an account" options={accts}
                 onSelectChange={ this.handleAcctChange.bind(this) } />
                <FileManagement selector="fileManagement" backupRequest={globalVar.requestBackup}
                 selectedBackup={ this.handleBackupChange.bind(this) }
                 backupOptions={backupOptions} backups={backups}
                 acctSelected={ tern(acctSelected) } showBackups={showBackups} />
                <Radio selector={tableSelector} prompt="type of table:"
                 options={radios} onRadioChange={ this.handleTypeChange.bind(this) } />
                <Select val={tableSelected} selector="tableSelect"
                 prompt="select a table" options={tables}
                 onSelectChange={ this.handleTableChange.bind(this) } />
                <Button selector={buttonSelector} prompt="load table"
                 onButtonClick={ this.handleTableLoad.bind(this) } />
                <Banner type={bannerType} prompt={bannerPrompt}
                 selector="statusBanner"
                 onBannerClose={ this.handleBannerClose.bind(this) } />
                <p>{acctsArr.length + " accts loaded, selected: "
                 + acctSelected + " " + tableSelected + " " + tableType}</p>
                { this.renderTable() }
            </div>
        )
    }
}
export default App