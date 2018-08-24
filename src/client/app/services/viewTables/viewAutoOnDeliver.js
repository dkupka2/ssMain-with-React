export const viewAutoOnDeliver = row => {
  let { ORDER, DESC, ACTIVE, CONDITION } = row;
  return {
    ORDER,
    DESC,
    ACTIVE: ACTIVE ? "" : "NO",
    CONDITION
  };
};
