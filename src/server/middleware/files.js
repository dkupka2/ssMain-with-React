const fs = require('fs');
const glob = require('glob');
const promisify = require('util').promisify;
const copy = promisify(fs.copyFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const pGlob = promisify(glob.glob);
// config from index
const configs = require('../').configs;
// drive letter from config
const drive = configs.paths.root;

let time, dir, acctNum, acct, gO, dbfiles, backUp, dest, patterns;

async function lookUpFile(file, dir = `${drive}/ordentry`, type = 'directory') {
  try {
    let target = await stat(`${dir}/${file.toString().trim()}`);
    // if target matches test type
    if (
      (target.isFile() && type === 'file') ||
      (target.isDirectory() && type === 'directory')
    ) {
      return true;
    } else {
      console.log(`lookUp target is not a ${type}`);
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

let timeStamp = () => {
  let d = new Date(),
    year = d.getFullYear(),
    month = d.getMonth() + 1,
    day = d.getDate(),
    hour = d.getHours(),
    minute = d.getMinutes();
  if (minute < 10) minute = `0${d.getMinutes()}`;
  return `${year}_${month}_${day}_${hour}_${minute}`;
};

let init = (acctNumber, time, drive = drive) => {
  dir = `${drive}:/ORDENTRY`;
  acctNum = `/${acctNumber}`;
  acct = `${dir}${acctNum}`;
  gO = { cwd: acct };
  dbfiles = `${acct}/DBFILES`;
  backUp = `${dbfiles}/BACKUP`;
  dest = `${backUp}/${time}`;
};

let initialize = (acct, time) => init(acct, time, drive);

patterns = [
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
  'CUSTOMER.*'
];

let exists = f => {
  try {
    const stats = fs.statSync(f);
    return true;
  } catch (e) {
    return false;
  }
};

let checkSubDir = dir => {
  if (exists(dir)) return true;
  try {
    fs.mkdirSync(dir);
  } catch (e) {
    return new Error`failed to create dir: ${dir} ${e}`();
  }
};

async function copyGlobs(source, dest, matches) {
  for (let match of matches) {
    try {
      await copy(`${source}/${match}`, `${dest}/${match}`);
    } catch (e) {
      return new Error`error copying ${source} to ${dest} ${e}`();
    }
  }
}

async function globFiles(file, source, dest) {
  try {
    await pGlob(file, gO, (err, matches) => {
      copyGlobs(source, dest, matches);
    });
  } catch (e) {
    return new Error();
  }
}

async function backupFiles(source, time, dest, files = patterns) {
  for (let file of files) {
    globFiles(file, source, time, dest);
  }
}

async function restoreFromBackup() {}

async function checkDirs(acct) {
  Promise.resolve(initialize(acct, timeStamp()))
    .then(checkSubDir(dbfiles))
    .then(checkSubDir(backUp))
    .then(checkSubDir(dest))
    .catch(e => {
      console.error(e);
      return false;
    });
}

const backupAcct = acct => {
  Promise.resolve(checkDirs(acct))
    .then(backupFiles(acct, time, dest))
    .catch(e => {
      console.error(e);
      return false;
    });
};

const restoreOrdentry = (acct, dir) => {
  initialize(acct, timeStamp());
  restoreFromBackup(acct, dir);
};

const getBackUps = (acct, cb) => {
  Promise.resolve(initialize(acct, timeStamp()))
    .then(checkSubDir(dbfiles))
    .then(checkSubDir(backUp))
    .then(
      pGlob('20*', { cwd: backUp }, (err, matches) => {
        cb('backups response', {
          acct: acct,
          data: matches.filter(dir => lookUpFile(dir, backUp))
        });
      }).catch(e => {
        console.error(e);
        return false;
      })
    );
};

module.exports = {
  backupAcct,
  checkDirs,
  lookUpFile,
  getBackUps
};
