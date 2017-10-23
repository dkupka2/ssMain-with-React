const fs = require("fs")
const promisify = require('util').promisify

const stat = promisify(fs.stat)
const mkdir = promisify(fs.mkdir)
const copy = promisify(fs.copyFile)

const dir = 'E:/ORDENTRY'
const acctNum = "/9987"

let acct = `${dir}${acctNum}`
let dbfiles = `${acct}/DBFILES`
let backUp = `${dbfiles}/BACKUP`

let timeStamp = () => {
    let d = new Date()
    let final =
    `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}`
    return final
}

async function exists(f) {
    try {
        const stats = await stat(f)
        return true
    } catch (e) {
        return false
    }
}

async function checkSubDirs(which) {
    const fileExists = await exists(which)

    if (fileExists) {
        console.log("dir exists: ", which)
        return true
    } else {
        try {
            await mkdir(which)
            console.log("made dir: ", which)
        } catch (e) {
            console.err('failed to create dir: ', which)
        }
    }
}

checkSubDirs(dbfiles)
    .then( checkSubDirs(backUp) )