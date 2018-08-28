import { subSelector } from "../";

export const getSelector_curry = element => selector => subSelector =>
  subSelector(selector, element);

export const getSelector = element => selector =>
  getSelector_curry(element)(selector)(subSelector);
