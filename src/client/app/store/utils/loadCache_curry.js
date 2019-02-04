import { applyView, cleanArr } from '../../services/';
import { makeBody, loadCache, tables } from '../';

export const loadCache_curry = data =>
  loadCache(data)(applyView)(tables)(makeBody)(cleanArr);
