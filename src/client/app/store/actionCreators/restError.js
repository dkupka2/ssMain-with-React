import { REST_ERROR } from '../';

export const restError = msg => {
  return {
    type: REST_ERROR,
    value: msg
  };
};
