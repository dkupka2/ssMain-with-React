import { isTruthy, showIfTrue } from "../";
// if arg1 than arg2 else if arg3 than arg 4 else hidden
export const blockSelector = (c1, res1, c2, res2) => {
  return isTruthy(c1, res1, showIfTrue(c2, res2));
};
