import { pipeDataToLoadCache, pipeDataToFormatTable } from '../';

export const renderFromCache = data => {
  return pipeDataToFormatTable(pipeDataToLoadCache(data));
};
