import React from "react";
import { getSelector } from "../services/";

const Input = props => {
  let {
    selector,
    prompt,
    value,
    change,
    submit,
    messageSelector,
    message
  } = props;

  return (
    <div className={getSelector("div")(selector)}>
      <p className={getSelector("p")(selector)}>{prompt}</p>
      <div className={getSelector("innerDiv")(selector)}>
        <input
          className={getSelector("input")(selector)}
          type="text"
          value={value}
          onChange={change}
        />
        <button className={getSelector("button")(selector)} onClick={submit}>
          Submit
        </button>
        <p className={messageSelector}>{message}</p>
      </div>
    </div>
  );
};

export default Input;
