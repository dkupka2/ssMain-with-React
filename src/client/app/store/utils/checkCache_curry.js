import { checkCache, filterRows, makeHeaders } from "../";

import { isArrayWithEls } from "../../services/";

export const checkCache_curry = data =>
  checkCache(data)(makeHeaders)(filterRows)(isArrayWithEls);
