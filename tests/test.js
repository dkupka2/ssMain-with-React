let path = "../src/client/app/";
let services = "services/__tests__/";
let store = "store/__tests__/";
// services
const blockSelector = require(`${path}${services}blockSelector.test`);
const checkArgs = require(`${path}${services}checkArgs.test`);
const cleanArr = require(`${path}${services}cleanArr.test`);
const compose = require(`${path}${services}compose.test`);
const getBEM = require(`${path}${services}getBEM.test`);
const getLastElFrom2DArray = require(`${path}${services}getLastElFrom2DArray.test`);
const isArraywithEls = require(`${path}${services}isArrayWithEls.test`);
const isEmptyObject = require(`${path}${services}isEmptyObject.test`);
const isObj = require(`${path}${services}isObj.test`);
const selectOptions = require(`${path}${services}selectOptions.test`);
const showIfTrue = require(`${path}${services}showIfTrue.test`);
const hideOrGenCSSClass = require(`${path}${services}hideOrGenCSSClass.test`);
const validateAcctNumberInput = require(`${path}${services}validateAcctNumberInput.test`);
// const filterPiTable = require(`${path}filterPiTable.test`)
// const filterTable = require(`${path}filterTable.test`)

// store/utils
const makeHeaders = require(`${path}${store}makeHeaders.test`);
const callAPI = require(`${path}${store}callAPI.test`);
const initAcct = require(`${path}${store}initAcct.test`);
const filterRows = require(`${path}${store}filterRows.test`);
const loadCache = require(`${path}${store}loadCache.test`);
