import { SUBMIT_REQUEST, callAPI } from "../";

export const restRequest = data => {
  let { acct, type, view } = data;
  callAPI(acct, type, view);
  return {
    type: SUBMIT_REQUEST,
    acct,
    optTable
  };
};
