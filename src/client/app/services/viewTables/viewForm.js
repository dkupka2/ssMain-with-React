export const viewForm = row => {
  let {
      PAGE_NUM,
      L_ROW,
      L_COL,
      GET_FIELD,
      GET_TYPE,
      G_LENGTH,
      LABEL,
      HAS_PARA,
      PARAGRAPH,
      G_PICTURE,
      FORMULA,
      LIST_NAME,
      SKIP_NAME,
      SKIP_LABEL,
      SAVE_OK
    } = row,
    prc = `P:${PAGE_NUM} R:${L_ROW} C:${L_COL}`,
    varStats = `${GET_FIELD} / ${GET_TYPE} / ${G_LENGTH}`;
  return {
    WHERE: prc,
    LABEL,
    PARAGRAPH: HAS_PARA ? PARAGRAPH : "",
    VARIABLE: G_LENGTH > 0 ? varStats : " ",
    FORMAT: G_PICTURE,
    FORMULA,
    LIST_NAME,
    SKIP_NAME,
    SKIP_LABEL,
    SAVE_OK: SAVE_OK === true ? "YES" : ""
  };
};
