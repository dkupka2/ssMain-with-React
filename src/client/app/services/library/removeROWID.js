export const removeROWID = obj => {
  obj = { ...obj };
  delete obj.ROWID;
  return obj;
};
