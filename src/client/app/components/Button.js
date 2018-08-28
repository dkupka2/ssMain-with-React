import React from "react";
import { getSelector } from "../services/";

const Button = props => {
  let { selector, click, prompt } = props;

  return (
    <div className={getSelector("div")}>
      <button className={getSelector("button")} onClick={click}>
        {prompt}
      </button>
    </div>
  );
};

export default Button;
