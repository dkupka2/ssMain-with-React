import { applyView, removeNilFromArray } from '../../services/';
import { makeBody, loadCache, tables } from '../';

export const loadCache_curry = data =>
  loadCache(data)(applyView)(tables)(makeBody)(removeNilFromArray);
