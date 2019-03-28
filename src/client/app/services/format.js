// return a function to filter each row for conflicts table
export const formatConflictsTableData = table => row => {
  const {
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
      }
      // if no formula or field return null
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

export const formatDuplicatesCheckTableData = data => {
  let final = [];
  // format and cache table rows
  let formattedRows = data.reduce((acc, row) => {
    const { GET_FIELD, FORMULA, PAGE_NUM, L_ROW, L_COL } = row;
    if (GET_FIELD && FORMULA) {
      const rowObject = {
        location: `P:${PAGE_NUM} R:${L_ROW} C:${L_COL}`,
        field: GET_FIELD,
        formula: FORMULA
      };
      if (!acc[GET_FIELD]) {
        acc[GET_FIELD] = [rowObject];
      } else {
        acc[GET_FIELD].push(rowObject);
      }
    }
    return acc;
  }, {});
  Object.keys(formattedRows).forEach(field => {
    if (
      // if there is only one instance of a formula for each field
      formattedRows[field].length <= 1 ||
      // or every formula in the array matches
      formattedRows[field].every(
        row => row.formula === formattedRows[field][0].formula
      )
    ) {
      // remove the array
      delete formattedRows[field];
    }
    // re-construct final with remaining elements
    if (formattedRows[field] && formattedRows[field].length > 0)
      final = [...final, ...formattedRows[field]];
  });
  return final;
};

// massage data for single table views
export const formatAutoOnDeliverTableData = row => {
  const { ORDER, DESC, ACTIVE, CONDITION } = row;
  return {
    ORDER,
    DESC,
    ACTIVE: ACTIVE ? '' : 'NO',
    CONDITION
  };
};

export const formatAutoOnSaveTableData = row => {
  const { ORDER, DESC, ACTIVE, CONDITION, CONTACT, COPYTOACCT } = row;
  return {
    ORDER,
    DESC,
    ACTIVE: ACTIVE ? '' : 'NO',
    CONDITION,
    CONTACT,
    COPYTOACCT
  };
};

export const formatBatchConditionsTableData = row => {
  const { ORDER, DESC, ACTIVE, CONDITION, CONTACT } = row;
  return {
    ORDER,
    DESC,
    ACTIVE: ACTIVE ? '' : 'NO',
    CONDITION,
    CONTACT
  };
};

export const formatContactsTableData = row => {
  const {
    NAME,
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
    CONTACT: convertPiValues('contacts')(row),
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

export const formatDispatchConditionsTableData = row => {
  const { NAME, VISIBLE, TESTFIELD, COMPTYPE, DATA1, DATA2, DESCR } = row;
  return {
    NAME,
    VISIBLE,
    TESTFIELD,
    COMPTYPE,
    COMPARISON: `${DATA1} - ${DATA2} - ${DESCR}`
  };
};

export const formatDCLTableData = row => {
  const { ORDER, DESC, CONDITION, CONTACT, FIELD, SOFTSEEK } = row;
  return {
    ORDER,
    DESC,
    CONDITION,
    CONTACT,
    FIELD: FIELD.slice(9, -1),
    SOFTSEEK: SOFTSEEK ? 'Y' : 'N'
  };
};

export const formatDispatchProceduresTableData = row => {
  const { NAME, ACTIVE, RAWSTEPS } = row;
  return {
    NAME,
    ACTIVE: ACTIVE ? 'Y' : 'N',
    RAWSTEPS
  };
};

export const formatFormTableData = row => {
  const {
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

export const formatDeliveriesTableData = row => {
  const { CONTACT, DAYS, EXCLUDE, TIME, ACTIVE } = row;
  return {
    CONTACT,
    DAYS: convertPiValues('days of the week')(DAYS),
    EXCLUDE: convertPiValues('holidays')(EXCLUDE),
    TIME,
    ACTIVE: ACTIVE ? '' : 'NO'
  };
};

export const formatRemindersTableData = row => {
  const {
    DESC,
    CONDITION,
    ACTIVE,
    DOW,
    TIME,
    INCLUDE,
    EXCLUDE,
    MSG_TYPES
  } = row;
  return {
    DESC,
    CONDITION,
    ACTIVE: ACTIVE ? '' : 'NO',
    DOW: convertPiValues('days of the week')(DOW),
    TIME,
    INCLUDE: convertPiValues('holidays')(INCLUDE),
    EXCLUDE: convertPiValues('holidays')(EXCLUDE),
    MSG_TYPES
  };
};

export const formatTimedActionsDataTable = row => {
  const {
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

export const formatDisplayConditionsTableData = row => {
  const { ORDER, TEMPLATE, FORMULA } = row;
  return {
    ORDER,
    TEMPLATE,
    FORMULA
  };
};
