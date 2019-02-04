import { REQUEST_VALIDATE_CLIENT, SUBMIT_ACCT_INPUT } from '../';

import { socket } from '../socket';

export const submitAcct = val => {
  socket.emit(REQUEST_VALIDATE_CLIENT, { acct: val });
  return {
    type: SUBMIT_ACCT_INPUT,
    value: val
  };
};
