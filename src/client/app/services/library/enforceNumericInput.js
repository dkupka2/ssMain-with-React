export const enforceNumericInput = val => {
  let arr;
  if (val) {
    arr = Array.from(val);
    if (
      // if length is valid and last char is a number
      arr.length < 5 &&
      !isNaN(parseInt(arr[arr.length - 1], 10))
    ) {
      // return string
      return val.slice();
    } else {
      // else return string without invalid char
      return val.slice(0, val.length - 1);
    }
  }
  return "";
};
