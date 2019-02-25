import { removeNilFromArray } from '../../services/';
import { makeBody, loadCache, tables } from '../';

// namespacing for relayCacheLoad dependences
const relayCacheLoadDeps = {
  clean: removeNilFromArray,
  tables,
  makeBody
};

export const relayCacheLoad = data => loadCache(data)(relayCacheLoadDeps);
