import React from "react";
import { getSelector } from "../services";

const Select = props => {
  let { selector, prompt, value, change, options } = props;

  return (
    <div className={getSelector("div")(selector)}>
      <p className={getSelector("p")(selector)}>{prompt}</p>
      <select
        className={getSelector("select")(selector)}
        value={value}
        onChange={change}
      >
        {options}
      </select>
    </div>
  );
};

export default Select;
