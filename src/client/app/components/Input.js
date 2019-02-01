import React from "react";
import { passSelector} from "../services/";

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
    <div className={passSelector"div")(selector)}>
      <p className={passSelector"p")(selector)}>{prompt}</p>
      <div className={passSelector"innerDiv")(selector)}>
        <input
          className={passSelector"input")(selector)}
          type="text"
          value={value}
          onChange={change}
        />
        <button className={passSelector"button")(selector)} onClick={submit}>
          Submit
        </button>
        <p className={messageSelector}>{message}</p>
      </div>
    </div>
  );
};

export default Input;
