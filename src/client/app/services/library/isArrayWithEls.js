export const isArrayWithEls = arr => {
  if (!Array.isArray(arr)) return false;
  if (arr.length < 1) return false;
  return true;
};
