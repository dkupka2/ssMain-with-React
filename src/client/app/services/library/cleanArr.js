export const cleanArr = (arr = []) => {
  let final = [];
  if (arr.length < 1) return arr;

  for (let el of arr) {
    if (el !== undefined && el !== null) final.push(el);
  }

  return final;
};
