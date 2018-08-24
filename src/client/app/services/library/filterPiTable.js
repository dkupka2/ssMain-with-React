import {
  viewAutoOnDeliver,
  viewAutoOnSave,
  viewBatchConditions,
  viewConflicts,
  viewContacts,
  viewDispatchConditions,
  viewDispatchContactLocator,
  viewDispatchProcedures,
  viewForm,
  viewScheduledDeliveries,
  viewScheduledReminders,
  viewTimedActions,
  viewViewConditions,
  removeROWID
} from "../";
// return a function to filter each row
export const filterPiTable = table => viewTable => {
  switch (viewTable) {
    // compound tables
    case "Conflicts":
      return viewConflicts(table);
    // single tables
    case "Form":
      return viewForm;
    case "Contacts":
      return viewContacts;
    case "Autos_on_Save":
      return viewAutoOnSave;
    case "Timed_Actions":
      return viewTimedActions;
    case "Autos_on_Deliver":
      return viewAutoOnDeliver;
    case "Batch_Conditions":
      return viewBatchConditions;
    case "Dispatch_Procedures":
      return viewDispatchProcedures;
    case "Dispatch_Conditions":
      return viewDispatchProcedures;
    case "Scheduled_Reminders":
      return viewScheduledReminders;
    case "Scheduled_Deliveries":
      return viewScheduledDeliveries;
    case "Message_View_Conditions":
      return viewViewConditions;
    case "Dispatch_Contact_Locator":
      return viewDispatchContactLocator;
    // case 'Abend' :
    //     return removeROWID
    // case 'Orders' :
    //     return removeROWID
    // case 'History' :
    //     return removeROWID
    // case 'On_Call' :
    //     return removeROWID
    // case 'Picklists' :
    //     return removeROWID
    // case 'Skiplists' :
    //     return removeROWID
    // case 'Help_Topics' :
    //     return removeROWID
    // case 'Customer_Database' :
    //     return removeROWID
    default:
      return removeROWID;
  }
};
