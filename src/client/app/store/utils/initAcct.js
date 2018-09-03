export const initAcct = list => {
  let obj = {};
  list.forEach(table => (obj[table] = []));
  return obj;
};
