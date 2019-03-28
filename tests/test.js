const path = '../src/client/app/';
const servicesPath = `${path}services/__tests__/`;
const storePath = `${path}store/__tests__/`;
// services
const createBlockSelector = require(`${servicesPath}createBlockSelector.test`);
const removeNilFromArray = require(`${servicesPath}removeNilFromArray.test`);
const convertPiValues = require(`${servicesPath}convertPiValues.test.js`);
const generateBEMSelector = require(`${servicesPath}generateBEMSelector.test`);
const getLastElFrom2DArray = require(`${servicesPath}getLastElFrom2DArray.test`);
const confirmIsNonEmptyArray = require(`${servicesPath}confirmIsNonEmptyArray.test`);
const checkIfEmptyObject = require(`${servicesPath}checkIfEmptyObject.test`);
const confirmIsObject = require(`${servicesPath}confirmIsObject.test`);
const createSelectOptions = require(`${servicesPath}createSelectOptions.test`);
const showIfTrue = require(`${servicesPath}showIfTrue.test`);
const generateCSSClass = require(`${servicesPath}generateCSSClass.test`);
const validateAcctNumberInput = require(`${servicesPath}validateAcctNumberInput.test`);
// const filterPiTable = require(`${path}filterPiTable.test`)
// const filterTable = require(`${path}filterTable.test`)

// tableData formatters
const formatDuplicatesCheck = require(`${servicesPath}formatDuplicatesCheck.test`);

// store/utils
const structureDataTable = require(`${storePath}structureDataTable.test`);
const callAPI = require(`${storePath}callAPI.test`);
const initAcct = require(`${storePath}initAcct.test`);
const filterRows = require(`${storePath}filterRows.test`);
// const loadCache = require(`${storePath}loadCache.test`);
