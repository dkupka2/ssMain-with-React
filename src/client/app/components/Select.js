import React from "react";
import { getSelector } from "../services";

const Select = props => {
  let { selector, prompt, value, change, options } = props;

  return (
    <div className={getSelector("div")}>
      <p className={getSelector("p")}>{prompt}</p>
      <select className={getSelector("select")} value={value} onChange={change}>
        {options}
      </select>
    </div>
  );
};

export default Select;
