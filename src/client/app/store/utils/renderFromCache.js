import { compose } from "../../services";

import { loadCache_curry, checkCache_curry } from "../";

export const renderFromCache = data =>
  compose(
    loadCache_curry,
    checkCache_curry,
    data
  );
