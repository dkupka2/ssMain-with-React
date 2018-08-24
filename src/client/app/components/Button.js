import React from "react";
import { subSelector } from "../services/";

const Button = props => {
  let { selector, click, prompt } = props;
  let getSelector = element => subSelector(selector, element);
  return (
    <div className={getSelector("div")}>
      <button className={getSelector("button")} onClick={click}>
        {prompt}
      </button>
    </div>
  );
};

export default Button;
