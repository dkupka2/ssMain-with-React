import React from 'react';
import { passSelector } from '../services';

const Select = props => {
  let { selector, prompt, value, change, options } = props;

  return (
    <div className={passSelector('div')(selector)}>
      <p className={passSelector('p')(selector)}>{prompt}</p>
      <select
        className={passSelector('select')(selector)}
        value={value}
        onChange={change}
      >
        {options}
      </select>
    </div>
  );
};

export default Select;
