let path = '../src/client/app/';
let services = 'services/__tests__/';
let store = 'store/__tests__/';
// services
const createBlockSelector = require(`${path}${services}createBlockSelector.test`);
const removeNilFromArray = require(`${path}${services}removeNilFromArray.test`);
const convertPiValues = require(`${path}${services}convertPiValues.test.js`);
const generateBEMSelector = require(`${path}${services}generateBEMSelector.test`);
const getLastElFrom2DArray = require(`${path}${services}getLastElFrom2DArray.test`);
const confirmIsNonEmptyArray = require(`${path}${services}confirmIsNonEmptyArray.test`);
const checkIfEmptyObject = require(`${path}${services}checkIfEmptyObject.test`);
const confirmIsObject = require(`${path}${services}confirmIsObject.test`);
const createSelectOptions = require(`${path}${services}createSelectOptions.test`);
const showIfTrue = require(`${path}${services}showIfTrue.test`);
const generateCSSClass = require(`${path}${services}generateCSSClass.test`);
const validateAcctNumberInput = require(`${path}${services}validateAcctNumberInput.test`);
// const filterPiTable = require(`${path}filterPiTable.test`)
// const filterTable = require(`${path}filterTable.test`)

// store/utils
const structureDataTable = require(`${path}${store}structureDataTable.test`);
const callAPI = require(`${path}${store}callAPI.test`);
const initAcct = require(`${path}${store}initAcct.test`);
const filterRows = require(`${path}${store}filterRows.test`);
const loadCache = require(`${path}${store}loadCache.test`);
