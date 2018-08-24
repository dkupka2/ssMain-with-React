export const viewDispatchContactLocator = row => {
  let { ORDER, DESC, CONDITION, CONTACT, FIELD, SOFTSEEK } = row;
  return {
    ORDER,
    DESC,
    CONDITION,
    CONTACT,
    FIELD: FIELD.slice(9, -1),
    SOFTSEEK: SOFTSEEK ? "Y" : "N"
  };
};
