import { REQUEST_LIST, REQUEST_LOCAL, REQUEST_GLOBAL } from './socketEvents';

export const tables = {
  global: {
    Timed_Actions: 'PT_TACTION',
    Scheduled_Reminders: 'PTREMIND',
    Scheduled_Deliveries: 'PT_SCHED'
  },
  local: {
    Form: 'OE_FORM',
    // Admin: 'OE_ADMIN',
    Abend: 'OE_ABEND',
    Orders: 'ORDERS',
    History: 'PT_HIST',
    On_Call: 'PTONCALL',
    Contacts: 'PT_CONTC',
    Picklists: 'OE_PKLST',
    Skiplists: 'OE_SKIP',
    Help_Topics: 'OE_HELP',
    Autos_on_Save: 'PT_AUTOA',
    Autos_on_Deliver: 'PT_AUTOB',
    Batch_Conditions: 'PT_BATCH',
    Customer_Database: 'CUSTOMER',
    Dispatch_Procedures: 'PT_PROC',
    Dispatch_Conditions: 'PT_CONDLIB',
    Dispatch_Contact_Locator: 'PT_DCL',
    Message_View_Conditions: 'PT_MDTPL'
    // Dispatch_Delivery_Table: 'PT_PROCDET',
  },
  compound: {
    Conflicts: {
      local: [
        'OE_FORM',
        'PT_AUTOA',
        'PT_AUTOB',
        'PT_BATCH',
        'PT_CONDLIB',
        'PT_DCL',
        'PT_MDTPL'
      ],
      global: ['PT_TACTION', 'PT_SCHED', 'PTREMIND']
    }
  },
  default: {
    compound: 'Conflicts',
    local: 'Form',
    global: 'Timed_Actions'
  },
  requestKeys: {
    list: REQUEST_LIST,
    local: REQUEST_LOCAL,
    global: REQUEST_GLOBAL
  },
  revertKeys: {}
};
// append lists of tables by type
tables.lists = {
  local: Object.keys(tables.local),
  global: Object.keys(tables.global),
  compound: Object.keys(tables.compound)
};
// build lists of documents in each compound table
tables.compoundLists = {};
tables.lists.compound.map(cList => {
  tables.compoundLists[cList] = tables.compound[cList].local.concat(
    tables.compound[cList].global
  );
});
// build lists of document names
Object.keys(tables.global).map(key => {
  tables.revertKeys[tables.global[key]] = key;
});
Object.keys(tables.local).map(key => {
  tables.revertKeys[tables.local[key]] = key;
});
// build list of document names for use by Rest API
tables.restKeys = Object.keys(tables.revertKeys);
// converts document name to view name
tables.convert = key => {
  return Object.keys(tables.revertKeys).includes(key)
    ? tables.revertKeys[key]
    : Object.keys(tables.global).includes(key)
    ? tables.global[key]
    : tables.local[key];
};
// retrieves table lists
tables.getTables = type => tables.lists[type];
