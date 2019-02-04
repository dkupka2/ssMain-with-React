import { cacheTable, renderFromCache } from '../';

export const restResponse = payload => dispatch => {
  dispatch(cacheTable(payload));
  dispatch(renderFromCache(payload));
};
