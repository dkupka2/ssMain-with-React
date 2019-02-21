const R = require('ramda');

import { relayCacheLoad, relayCacheCheck } from '../';

export const renderFromCache = data =>
  R.compose(
    relayCacheLoad,
    relayCacheCheck
  )(data);
