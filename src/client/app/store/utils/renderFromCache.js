import { relayCacheLoad, pipeDataToFormatTable } from '../';

export const renderFromCache = data => {
  return pipeDataToFormatTable(relayCacheLoad(data));
};
