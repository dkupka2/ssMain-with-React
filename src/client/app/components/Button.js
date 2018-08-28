import React from "react";
import { getSelector } from "../services/";

const Button = props => {
  let { selector, click, prompt } = props;

  return (
    <div className={getSelector("div")(selector)}>
      <button className={getSelector("button")(selector)} onClick={click}>
        {prompt}
      </button>
    </div>
  );
};

export default Button;
