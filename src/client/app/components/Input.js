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
    <div className={getSelector("div")}>
      <p className={getSelector("p")}>{prompt}</p>
      <div className={getSelector("innerDiv")}>
        <input
          className={getSelector("input")}
          type="text"
          value={value}
          onChange={change}
        />
        <button className={getSelector("button")} onClick={submit}>
          Submit
        </button>
        <p className={messageSelector}>{message}</p>
      </div>
    </div>
  );
};

export default Input;
