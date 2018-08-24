import { isObj } from "../";

export const getKeys = (obj = []) => (isObj(obj) ? Object.keys(obj) : []);
