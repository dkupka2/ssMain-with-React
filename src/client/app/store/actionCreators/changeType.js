import { SELECT_TYPE, renderFromCache } from "../";

export const changeType = data => dispatch => {
  dispatch(renderFromCache(data));
  dispatch({
    type: SELECT_TYPE,
    tableType: data.type,
    table: data.optTable
  });
};
