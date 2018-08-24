export const checkArgs = (...args) => {
  if (args.length < 1) return false;
  for (let arg of args) {
    if (arg === undefined || arg === null) return false;
  }
  return true;
};
