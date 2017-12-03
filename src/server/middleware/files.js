const fs = require("fs")
const _ = require("lodash")
const glob = require('glob')

const globals = require("../../../global.js").paths

const promisify = require('util').promisify
const copy = promisify(fs.copyFile)
const readdir = promisify(fs.readdir)
const pGlob = promisify(glob.glob)

let lookUpFile = ( file, dir = `${globals.root}/ordentry`, type = "dir" )  => {
    let target = _.attempt( (path) => {
        return fs.statSync(path);
    }, `${dir}/${ file.toString().trim() }` )
    if ( target instanceof Error ) { 
        console.log(`error from lookUp${target}`)
        return false
    }
    if ( target.isFile() && type === "file" || 
         target.isDirectory() && type === "dir" ) {
        return true
    } else {
        console.log(`lookUp target is not a ${type === "dir" ? "directory" : "file"}`)
        return false
    }
}

let timeStamp = () => {
    let d = new Date()
    let minutes = d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`
    let final =
    `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}_${d.getHours()}_${minutes}`
    return final
}

let time
let dir
let acctNum
let acct
let gO
let dbfiles
let backUp
let dest

let initialize = (acctNumber, setTime, drive = "E") => {
    let final = {}
    time = setTime
    dir = `${drive}:/ORDENTRY`
    acctNum = `/${acctNumber}`
    acct = `${dir}${acctNum}`
    gO = {cwd: acct}
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
        return true
    } else {
        try {
            fs.mkdirSync(which)
        } catch (e) {
            return new Error `failed to create dir: ${which} ${e}`
        }
    }
}

async function copyGlobs(source, dest, matches) {
    for (let match of matches) {
        try {
            await copy(`${source}/${match}`, `${dest}/${match}`)
        } catch (e) {
            return new Error `error copying file: ${source} to ${dest} ${e}`
        }
    }
}

async function globFiles(file, source, dest) {
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

async function restoreFromBackup() {

}

async function checkDirs(acct) {
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
    Promise.resolve( checkDirs(acct) )
        .then( backupFiles(acct, time, dest) )
        .catch((e) => {
            console.error(e)
            return false
        })
}

const restoreOrdentry = (acct, ) => {
    initialize(acct, timeStamp())
    restoreFromBackup()
}

const getBackUps = (acct, cb) => {
    Promise.resolve( initialize(acct, timeStamp() ) )
        .then( checkSubDir(dbfiles) )
        .then( checkSubDir(backUp) )
        .then( pGlob("201*", {cwd: backUp}, (err, matches) => {
            cb("backups response", {acct: acct, data: matches.filter( (dir) => lookUpFile(dir, backUp) )} )
        })
        .catch((e) => {
            console.error(e)
            return false
        })
        )
}

module.exports = {
    backupAcct,
    checkDirs,
    lookUpFile,
    getBackUps
}