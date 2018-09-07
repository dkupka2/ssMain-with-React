let path = "../src/client/app/";
let services = "services/__tests__/";
let store = "store/__tests__/";
// services
const blockSelector = require(`${path}${services}blockSelector.test`);
const checkArgs = require(`${path}${services}checkArgs.test`);
const cleanArr = require(`${path}${services}cleanArr.test`);
const compose = require(`${path}${services}compose.test`);
const getBEM = require(`${path}${services}getBEM.test`);
const getKeys = require(`${path}${services}getKeys.test`);
const getLastArray = require(`${path}${services}getLastArray.test`);
const isArraywithEls = require(`${path}${services}isArrayWithEls.test`);
const isEmptyObject = require(`${path}${services}isEmptyObject.test`);
const isObj = require(`${path}${services}isObj.test`);
const isTruthy = require(`${path}${services}isTruthy.test`);
const selectOptions = require(`${path}${services}selectOptions.test`);
const showIfTrue = require(`${path}${services}showIfTrue.test`);
const subSelector = require(`${path}${services}subSelector.test`);
const enforceNumericInput = require(`${path}${services}enforceNumericInput.test`);
// store/utils
const makeHeaders = require(`${path}${store}makeHeaders.test`);
const callAPI = require(`${path}${store}callAPI.test`);
const initAcct = require(`${path}${store}initAcct.test`);
const filterRows = require(`${path}${store}filterRows.test`);

// const filterPiTable = require(`${path}filterPiTable.test`)
// const filterTable = require(`${path}filterTable.test`)
