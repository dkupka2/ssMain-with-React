import { ACCT_VALID, ACCT_INVALID } from "../";

export const validateClient = data => {
  return {
    type: data.valid ? ACCT_VALID : ACCT_INVALID,
    acct: data.acct
  };
};
