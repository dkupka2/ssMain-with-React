export const viewBatchConditions = row => {
  let { ORDER, DESC, ACTIVE, CONDITION, CONTACT } = row;
  return {
    ORDER,
    DESC,
    ACTIVE: ACTIVE ? "" : "NO",
    CONDITION,
    CONTACT
  };
};
