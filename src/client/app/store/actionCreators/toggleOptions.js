import { OPEN_FILE_OPTIONS, CLOSE_FILE_OPTIONS } from "../";

export const toggleOptions = open => dispatch =>
  dispatch({ type: open === true ? CLOSE_FILE_OPTIONS : OPEN_FILE_OPTIONS });
