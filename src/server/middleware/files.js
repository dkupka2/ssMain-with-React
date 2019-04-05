const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
// config from index
const configs = require('../').configs;
// drive letter from config
const drive = configs.paths.root;

async function lookUpFile(file, dir = `${drive}/ordentry`, type = 'directory') {
  try {
    const target = await stat(`${dir}/${file.toString().trim()}`);
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

module.exports = {
  lookUpFile
};
