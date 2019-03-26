import React from 'react';

// import formatters here so they are accessible locally
import {
  formatConflictsTableData,
  formatDuplicatesCheckTableData,
  formatAutoOnDeliverTableData,
  formatAutoOnSaveTableData,
  formatBatchConditionsTableData,
  formatContactsTableData,
  formatDispatchConditionsTableData,
  formatDCLTableData,
  formatDispatchProceduresTableData,
  formatFormTableData,
  formatDeliveriesTableData,
  formatRemindersTableData,
  formatTimedActionsDataTable,
  formatDisplayConditionsTableData
} from './format';

export const applyFormatting = table => data => viewTable =>
  viewTable === 'Duplicates'
    ? formatDuplicatesCheckTableData(data)
    : data.map(row => filterPiTable(table)(viewTable)(row));

// if arg1 than arg2 else if arg3 than arg 4 else hidden
export const createBlockSelector = (c1, res1, c2, res2) =>
  c1 ? res1 : showIfTrue(c2, res2);

export const removeNilFromArray = (arr = []) => {
  let final = [];
  if (arr.length < 1) return arr;
  for (let el of arr) {
    if (el !== undefined && el !== null) final.push(el);
  }
  return final;
};

export const convertPiValues = type => data => {
  if (Array.isArray(data) && data.length < 1) return '';
  const convert = tuples => {
    return tuples.reduce((acc, tuple) => {
      if (data.includes(tuple[0])) acc.push(tuple[1]);
      return acc;
    }, []);
  };
  switch (type) {
    case 'timed auto type':
      if (data.includes(1)) return 'add message';
      if (data.includes(2)) return 'change status';
      if (data.includes(3)) return 'timed action';
      break;
    case 'message status':
      return convert([
        [1, 'delivered'],
        [2, 'hold'],
        [3, 'undelivered'],
        [4, 'priority']
      ]).join(' ');
    case 'days of the week':
      return convert([
        [1, 'Sun'],
        [2, 'Mon'],
        [3, 'Tues'],
        [4, 'Wed'],
        [5, 'Thurs'],
        [6, 'Fri'],
        [7, 'Sat']
      ]).join(' ');
    case 'holidays':
      return convert([
        ['H01', 'NEWYEARS'],
        ['H02', 'MLK'],
        ['H03', 'PRESIDENTS'],
        ['H04', 'PATRIOTS'],
        ['H05', 'MEMORIAL'],
        ['H06', 'INDEPENDENCE'],
        ['H07', 'LABOR'],
        ['H08', 'COLUMBUS'],
        ['H09', 'VETERANS'],
        ['H10', 'THANKSGIVING'],
        ['H11', 'BLACKFRIDAY'],
        ['H12', 'CHRISTMAS'],
        ['S1', 'BOXING']
        // ['S2', 'SPECIAL DAY 2'],
        // ['S3', 'SPECIAL DAY 3']
      ]).join(' ');
    case 'contacts':
      let final = [],
        { NAME, NUMBER, OVERDIAL, EMAIL_ADDY, SM_USER } = data;
      if (NAME && NAME !== ' ') final.push(NAME);
      if (NUMBER && NUMBER !== ' ') final.push(NUMBER);
      if (SM_USER && SM_USER !== ' ') final.push(SM_USER);
      if (OVERDIAL && OVERDIAL !== ' ') final.push(OVERDIAL);
      if (EMAIL_ADDY && EMAIL_ADDY !== ' ') final.push(EMAIL_ADDY);
      return final.join(' ');
    default:
      alert(`unexpected type: ${type}`);
  }
};

export const validateAcctNumberInput = value => {
  if (value) {
    if (
      // if length is valid and last char is a number
      value.length < 5 &&
      !isNaN(value.charAt(value.length - 1))
    ) {
      // return string
      return value;
    } else {
      // else return string without invalid char
      return value.slice(0, value.length - 1);
    }
  }
  return '';
};

// return a function to filter each row
export const filterPiTable = table => viewTable => {
  switch (viewTable) {
    // constructed tables
    case 'Conflicts':
      return formatConflictsTableData(table);
    // single tables
    case 'Form':
      return formatFormTableData;
    case 'Contacts':
      return formatContactsTableData;
    case 'Autos_on_Save':
      return formatAutoOnSaveTableData;
    case 'Timed_Actions':
      return formatTimedActionsDataTable;
    case 'Autos_on_Deliver':
      return formatAutoOnDeliverTableData;
    case 'Batch_Conditions':
      return formatBatchConditionsTableData;
    case 'Dispatch_Procedures':
      return formatDispatchProceduresTableData;
    case 'Dispatch_Conditions':
      return formatDispatchProceduresTableData;
    case 'Scheduled_Reminders':
      return formatRemindersTableData;
    case 'Scheduled_Deliveries':
      return formatDeliveriesTableData;
    case 'Message_View_Conditions':
      return formatDisplayConditionsTableData;
    case 'Dispatch_Contact_Locator':
      return formatDCLTableData;
    default:
      return removeROWID;
  }
};

export const generateBEMSelector = (block, element, ...modifiers) => {
  let final = `${block}_${element}`;
  modifiers.map(modifier => {
    final = final.concat(` ${block}_${element}_${modifier}`);
  });
  return final;
};

export const getLastElFrom2DArray = arr =>
  confirmIsNonEmptyArray(arr) ? arr[arr.length - 1] : [];

export const createSelector = element => selector => generateCSSClass =>
  generateCSSClass(selector, element);

// partially apply createSelector to hide dependancy from JSX elements
export const passSelector = element => selector =>
  createSelector(element)(selector)(generateCSSClass);

export const confirmIsNonEmptyArray = arr =>
  Array.isArray(arr) && arr.length > 0;

export const checkIfEmptyObject = obj =>
  confirmIsObject(obj) && Object.keys(obj).length === 0;

export const confirmIsObject = obj =>
  typeof obj === 'object' &&
  !Array.isArray(obj) &&
  !(obj instanceof Set) &&
  !(obj instanceof Map) &&
  obj != undefined;

export const removeROWID = obj => {
  obj = { ...obj };
  delete obj.ROWID;
  return obj;
};

export const createSelectOptions = obj => {
  let elems = [];
  const arr = Array.isArray(obj) ? obj : Object.keys(obj);
  if (arr === undefined) return;
  if (arr.length > 0) {
    arr.map(el =>
      elems.push(
        <option key={el.toString()} value={el}>
          {el}
        </option>
      )
    );
    return elems;
  }
};

export const showIfTrue = (x, sel) => (x ? sel : 'hidden');

export const generateCSSClass = (selector, element) =>
  selector === 'hidden' ? 'hidden' : `${selector}_${element}`;
