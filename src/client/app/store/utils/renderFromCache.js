const R = require('ramda');

import { loadCache_curry, checkCache_curry } from "../";

export const renderFromCache = data =>
  R.compose(loadCache_curry, checkCache_curry)(data);
