export const initAcct = list =>
  list.reduce((a, b) => {
    a[b] = [];
    return a;
  }, {});
