import React from 'react';

export const applyView = table => data => viewTable =>
  data.map(row => filterPiTable(table)(viewTable)(row));

// if arg1 than arg2 else if arg3 than arg 4 else hidden
export const blockSelector = (c1, res1, c2, res2) => {
  return c1 ? res1 : showIfTrue(c2, res2);
};

export const cleanArr = (arr = []) => {
  let final = [];
  if (arr.length < 1) return arr;
  for (let el of arr) {
    if (el !== undefined && el !== null) final.push(el);
  }
  return final;
};

export const convertPiValues = (value, type) => {
  let convert = tuples => {
    let final = [];
    tuples.forEach(tuple => {
      if (value.includes(tuple[0])) final.push(tuple[1]);
    });
  };
  switch (type) {
    case 'timed auto type':
      if (value.includes(1)) return 'add message';
      if (value.includes(2)) return 'change status';
      if (value.includes(3)) return 'timed action';
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
      let { NUMBER, OVERDIAL, PIN, EMAIL_ADDY, SUBJECT, SM_USER } = value;
      if (PIN && PIN !== ' ') final.push(`$:{PIN}`);
      if (NUMBER && NUMBER !== ' ') final.push(NUMBER);
      if (SUBJECT && SUBJECT !== ' ') final.push(`$:{SUBJECT}`);
      if (SM_USER && SM_USER !== ' ') final.push(SM_USER);
      if (OVERDIAL && OVERDIAL !== ' ') final.push(OVERDIAL);
      if (EMAIL_ADDY && EMAIL_ADDY !== ' ') final.push(EMAIL_ADDY);
      return final.join(' ');
    default:
      alert(`unexpected type: ${type}`);
  }
};

export const validateAcctNumberInput = value => {
  let arr;
  if (value) {
    arr = Array.from(value);
    if (
      // if length is valid and last char is a number
      arr.length < 5 &&
      !isNaN(parseInt(arr[arr.length - 1], 10))
    ) {
      // return string
      return value.slice();
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
    // compound tables
    case 'Conflicts':
      return viewConflicts(table);
    // single tables
    case 'Form':
      return viewForm;
    case 'Contacts':
      return viewContacts;
    case 'Autos_on_Save':
      return viewAutoOnSave;
    case 'Timed_Actions':
      return viewTimedActions;
    case 'Autos_on_Deliver':
      return viewAutoOnDeliver;
    case 'Batch_Conditions':
      return viewBatchConditions;
    case 'Dispatch_Procedures':
      return viewDispatchProcedures;
    case 'Dispatch_Conditions':
      return viewDispatchProcedures;
    case 'Scheduled_Reminders':
      return viewScheduledReminders;
    case 'Scheduled_Deliveries':
      return viewScheduledDeliveries;
    case 'Message_View_Conditions':
      return viewViewConditions;
    case 'Dispatch_Contact_Locator':
      return viewDispatchContactLocator;
    default:
      return removeROWID;
  }
};

export const getBEM = (block, element, ...modifiers) => {
  let final = `${block}_${element}`;
  modifiers.map(modifier => {
    final = final.concat(` ${block}_${element}_${modifier}`);
  });
  return final;
};

export const getLastElFrom2DArray = arr =>
  isArrayWithEls(arr) ? arr[arr.length - 1] : [];

export const createSelector = element => selector => hideOrGenCSSClass =>
  hideOrGenCSSClass(selector, element);

// partially apply createSelector to hide dependancy from JSX elements
export const passSelector = element => selector =>
  createSelector(element)(selector)(hideOrGenCSSClass);

export const isArrayWithEls = arr => Array.isArray(arr) && arr.length > 0;

export const isEmptyObject = obj => isObj(obj) && Object.keys(obj).length === 0;

export const isObj = obj =>
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

export const selectOptions = obj => {
  let elems = [];
  let arr = Array.isArray(obj) ? obj : Object.keys(obj);
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

export const hideOrGenCSSClass = (selector, element) =>
  selector === 'hidden' ? 'hidden' : `${selector}_${element}`;

// return a function to filter each row for conflicts table
export const viewConflicts = table => row => {
  let {
    ACTIVE,
    CONDITION,
    DATA1,
    DATA2,
    DESC,
    FORMULA,
    GET_FIELD,
    L_ROW,
    L_COL,
    NAME,
    ORDER,
    PAGE_NUM,
    TESTFIELD,
    TYPE
  } = row;
  switch (table) {
    case 'Form':
      if (GET_FIELD && FORMULA) {
        return {
          document: 'oe form',
          location: `P:${PAGE_NUM} R:${L_ROW} C:${L_COL}`,
          condition: `${GET_FIELD} : ${FORMULA}`,
          active: `${
            FORMULA && FORMULA.toString().slice(0, 1) !== '~' ? '' : 'NO'
          }`
        };
        // if no formula or field return null
      }
      return null;
    case 'Autos_on_Save':
      return {
        document: 'auto-a',
        location: `${ORDER}: ${DESC}`,
        condition: CONDITION,
        active: ACTIVE ? '' : 'NO'
      };
    case 'Timed_Actions':
      return {
        document: 'timed autos',
        location: `${TYPE}: ${DESC}`,
        condition: CONDITION,
        active: ACTIVE ? '' : 'NO'
      };
    case 'Autos_on_Deliver':
      return {
        document: 'auto-b',
        location: `${ORDER}: ${DESC}`,
        condition: CONDITION,
        active: ACTIVE ? '' : 'NO'
      };
    case 'Batch_Conditions':
      return {
        document: 'scheduled deliveries',
        location: 'N/A',
        condition: 'SEE CONDITIONS',
        active: ACTIVE ? '' : 'NO'
      };
    case 'Dispatch_Conditions':
      return {
        document: 'dispatch conditions',
        location: `${NAME} - ${DESC}`,
        condition: `${TESTFIELD}: ${DATA1} - ${DATA2}`,
        active: 'see procedures'
      };
    case 'Scheduled_Reminders':
      return {
        document: 'scheduled reminders',
        location: DESC,
        condition: CONDITION,
        active: ACTIVE ? '' : 'NO'
      };
    case 'Scheduled_Deliveries':
      return {
        document: 'scheduled delivery conditions',
        location: `${ORDER} ${DESC}`,
        condition: CONDITION,
        active: ACTIVE ? '' : 'NO'
      };
    case 'Message_View_Conditions':
      return {
        document: 'message view conditions',
        location: ORDER,
        condition: FORMULA,
        active: ORDER ? '' : 'NO'
      };
    case 'Dispatch_Contact_Locator':
      return {
        document: 'dcl',
        location: `${ORDER}: ${DESC}`,
        condition: CONDITION,
        active: CONDITION ? '' : 'NO'
      };
    default:
      return {
        document: 'n/a',
        location: 'n/a',
        condition: 'n/a',
        active: 'n/a'
      };
  }
};

// massage data for single table views
export const viewAutoOnDeliver = row => {
  let { ORDER, DESC, ACTIVE, CONDITION } = row;
  return {
    ORDER,
    DESC,
    ACTIVE: ACTIVE ? '' : 'NO',
    CONDITION
  };
};

export const viewAutoOnSave = row => {
  let { ORDER, DESC, ACTIVE, CONDITION, CONTACT, COPYTOACCT } = row;
  return {
    ORDER,
    DESC,
    ACTIVE: ACTIVE ? '' : 'NO',
    CONDITION,
    CONTACT,
    COPYTOACCT
  };
};

export const viewBatchConditions = row => {
  let { ORDER, DESC, ACTIVE, CONDITION, CONTACT } = row;
  return {
    ORDER,
    DESC,
    ACTIVE: ACTIVE ? '' : 'NO',
    CONDITION,
    CONTACT
  };
};

export const viewContacts = row => {
  let {
    NAME,
    CONTACT,
    ON_CALL,
    RECALL,
    MSG_TYPES,
    TEMPLATE,
    FORM_NAME,
    COMMANDS,
    VISIBLE,
    DEL_TO
  } = row;
  return {
    NAME,
    CONTACT: convertPiValues(row, 'contacts'),
    ON_CALL,
    RECALL,
    MSG_TYPES,
    TEMPLATE,
    FORM_NAME,
    COMMANDS,
    VISIBLE: VISIBLE ? 'Y' : 'N',
    DEL_TO: DEL_TO ? 'Y' : 'N'
  };
};

export const viewDispatchConditions = row => {
  let { NAME, VISIBLE, TESTFIELD, COMPTYPE, DATA1, DATA2, DESCR } = row;
  return {
    NAME,
    VISIBLE,
    TESTFIELD,
    COMPTYPE,
    COMPARISON: `${DATA1} - ${DATA2} - ${DESCR}`
  };
};

export const viewDispatchContactLocator = row => {
  let { ORDER, DESC, CONDITION, CONTACT, FIELD, SOFTSEEK } = row;
  return {
    ORDER,
    DESC,
    CONDITION,
    CONTACT,
    FIELD: FIELD.slice(9, -1),
    SOFTSEEK: SOFTSEEK ? 'Y' : 'N'
  };
};

export const viewDispatchProcedures = row => {
  let { NAME, ACTIVE, RAWSTEPS } = row;
  return {
    NAME,
    ACTIVE: ACTIVE ? 'Y' : 'N',
    RAWSTEPS
  };
};

export const viewForm = row => {
  let {
      PAGE_NUM,
      L_ROW,
      L_COL,
      GET_FIELD,
      GET_TYPE,
      G_LENGTH,
      LABEL,
      HAS_PARA,
      PARAGRAPH,
      G_PICTURE,
      FORMULA,
      LIST_NAME,
      SKIP_NAME,
      SKIP_LABEL,
      SAVE_OK
    } = row,
    prc = `P:${PAGE_NUM} R:${L_ROW} C:${L_COL}`,
    varStats = `${GET_FIELD} / ${GET_TYPE} / ${G_LENGTH}`;
  return {
    WHERE: prc,
    LABEL,
    PARAGRAPH: HAS_PARA ? PARAGRAPH : '',
    VARIABLE: G_LENGTH > 0 ? varStats : ' ',
    FORMAT: G_PICTURE,
    FORMULA,
    LIST_NAME,
    SKIP_NAME,
    SKIP_LABEL,
    SAVE_OK: SAVE_OK === true ? 'YES' : ''
  };
};

export const viewScheduledDeliveries = row => {
  let { CONTACT, DAYS, EXCLUDE, TIME, ACTIVE } = row;
  return {
    CONTACT,
    DAYS: convertPiValues(DAYS, 'days of the week'),
    EXCLUDE: convertPiValues(EXCLUDE, 'holidays'),
    TIME,
    ACTIVE: ACTIVE ? '' : 'NO'
  };
};

export const viewScheduledReminders = row => {
  let { DESC, CONDITION, ACTIVE, DOW, TIME, INCLUDE, EXCLUDE, MSG_TYPES } = row;
  return {
    DESC,
    CONDITION,
    ACTIVE: ACTIVE ? '' : 'NO',
    DOW: convertPiValues(DOW, 'days of the week'),
    TIME,
    INCLUDE: convertPiValues(INCLUDE, 'holidays'),
    EXCLUDE: convertPiValues(EXCLUDE, 'holidays'),
    MSG_TYPES
  };
};

export const viewTimedActions = row => {
  let {
    TYPE,
    DESC,
    CONDITION,
    MSG_TYPES,
    TASDSTATUS,
    DATE,
    TIME,
    INCLUDE,
    EXCLUDE,
    ACTIVE,
    DATA
  } = row;
  return {
    TYPE,
    DESC,
    CONDITION,
    MSG_TYPES: convertPiValues(MSG_TYPES, 'message status'),
    TASDSTATUS: convertPiValues(TASDSTATUS, 'message status'),
    DATE,
    TIME,
    INCLUDE,
    EXCLUDE,
    ACTIVE: ACTIVE ? 'Y' : 'N',
    DATA
  };
};

export const viewViewConditions = row => {
  let { ORDER, TEMPLATE, FORMULA } = row;
  return {
    ORDER,
    TEMPLATE,
    FORMULA
  };
};
