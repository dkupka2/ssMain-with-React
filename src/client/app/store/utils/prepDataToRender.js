import { pipeDataToLoadCache, pipeDataToFormatTable } from '../';

export const prepDataToRender = data => {
  return pipeDataToFormatTable(pipeDataToLoadCache(data));
};
