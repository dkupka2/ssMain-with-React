import { SELECT_TYPE, prepDataToRender } from '../';

export const changeType = data => dispatch => {
  dispatch(prepDataToRender(data));
  dispatch({
    type: SELECT_TYPE,
    tableType: data.type,
    table: data.view
  });
};
