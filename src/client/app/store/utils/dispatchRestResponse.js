import { cacheTable, prepDataToRender } from '../';

export const dispatchRestResponse = payload => dispatch => {
  dispatch(cacheTable(payload));
  dispatch(prepDataToRender(payload));
};
