import React from "react";
import { subSelector } from "../services";

const Select = props => {
  let { selector, prompt, value, change, options } = props;
  let getSelector = element => subSelector(selector, element);
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
