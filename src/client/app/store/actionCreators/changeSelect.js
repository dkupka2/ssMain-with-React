import { CHANGE_ACCT } from '../';

export const changeSelect = target => {
  return {
    type: CHANGE_ACCT,
    selectedAcct: target
  };
};
