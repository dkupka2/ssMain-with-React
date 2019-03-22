import React from 'react';
import { passSelector } from '../services/';

const Button = props => {
  const { selector, click, prompt } = props;

  return (
    <div className={passSelector('div')(selector)}>
      <button className={passSelector('button')(selector)} onClick={click}>
        {prompt}
      </button>
    </div>
  );
};

export default Button;
