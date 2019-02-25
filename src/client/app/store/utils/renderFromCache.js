import { relayCacheLoad, relayCacheCheck } from '../';

export const renderFromCache = data => {
  return relayCacheCheck(relayCacheLoad(data));
};
