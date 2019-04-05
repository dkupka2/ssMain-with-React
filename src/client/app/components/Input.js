import React from 'react';
import { passSelector } from '../services/';

const Input = props => {
  const { prompt, value, change, submit, status, message } = props;

  const messageColor = status => {
    switch (status) {
      case 'looking':
        return 'orange';
      case 'valid':
        return 'green';
      case 'invalid':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ marginLeft: '15px', display: 'inherit' }}>{prompt}</p>
      <div style={{ display: 'inline' }}>
        <input type='text' value={value} onChange={change} />
        <button onClick={submit}>Submit</button>
        <p
          style={{
            display: 'inherit',
            marginLeft: '15px',
            color: messageColor(status)
          }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Input;
