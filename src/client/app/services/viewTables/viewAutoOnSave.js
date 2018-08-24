export const viewAutoOnSave = row => {
  let { ORDER, DESC, ACTIVE, CONDITION, CONTACT, COPYTOACCT } = row;
  return {
    ORDER,
    DESC,
    ACTIVE: ACTIVE ? "" : "NO",
    CONDITION,
    CONTACT,
    COPYTOACCT
  };
};
