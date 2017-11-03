const fs = require("fs")
const promisify = require('util').promisify
const glob = require('glob')

const copy = promisify(fs.copyFile)
let pGlob = promisify(glob.glob)

let timeStamp = () => {
    let d = new Date()
    let final =
    `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}`
    return final
}

let time
let dir
let acctNum
let acct
let dbfiles
let backUp
let dest

let initialize = (acctNumber, setTime, drive = "E") => {
    let final = {}
    time = setTime
    dir = `${drive}:/ORDENTRY`
    acctNum = `/${acctNumber}`
    acct = `${dir}${acctNum}`
    dbfiles = `${acct}/DBFILES`
    backUp = `${dbfiles}/BACKUP`
    dest = `${backUp}/${time}`
}

let patterns = [
    'OE_FORM.*',
    'OE_SKIP.*',
    'OE_PKLST.*',
    '*L*.*',
    'OE_GOTO.*',
    'ORDERS.*',
    'PT_AUTOA.*',
    'PT_AUTOB.*',
    'PT_OC*.*',
    'PT_CONTC.*',
    'CUSTOMER.*',
]

gO = {cwd: acct}


let exists = (f) => {
    try {
        const stats = fs.statSync(f)
        return true
    } catch (e) {
        return false
    }
}

let checkSubDir = (which) => {
    if (exists(which)) {
        console.log("dir exists: ", which)
        return true
    } else {
        try {
            fs.mkdirSync(which)
            // report dir is made?
        } catch (e) {
            // console.error('failed to create dir: ', which, e)
            return new Error `failed to create dir: ${which} ${e}`
        }
    }
}

async function copyGlobs(source, dest, matches) {
    for (let match of matches) {
        try {
            await copy(`${source}/${match}`, `${dest}/${match}`)
        } catch (e) {
            // console.error("error copying file: ",source,match," to ",dest,e)
            return new Error `error copying file: ${source} to ${dest} ${e}`
        }
    }
}

async function globFiles(file, source, time, dest) {
    try {
        await pGlob(file, gO, (err, matches) => {
            copyGlobs(source, dest, matches)
        })
    } catch(e) {
        console.error(e)
    }
}

async function backupFiles(source, time, dest, files = patterns) {
    for (let file of files) {
        globFiles(file, source, time, dest)
    }
}

async function getBackupList() {

}

async function restoreFromBackup() {

}

const checkDirs = (acct) => {
    Promise.resolve( initialize(acct, timeStamp() ) )
        .then( checkSubDir(dbfiles) )
        .then( checkSubDir(backUp) )
        .then( checkSubDir(dest) )
        .catch((e) => {
            console.error(e)
            return false
        })
}

const backupAcct = (acct) => {
    Promise.resolve( initialize(acct, timeStamp() ) )
        .then( checkSubDir(dbfiles) )
        .then( checkSubDir(backUp) )
        .then( checkSubDir(dest) )
        .then( backupFiles(acct, time, dest) )
        .catch((e) => {
            console.error(e)
            return false
        })
}

const restoreOrdentry = (acct) => {
    initialize(acct, timeStamp())
    restoreFromBackup()
}

module.exports = {
    backupAcct,
    checkDirs
}