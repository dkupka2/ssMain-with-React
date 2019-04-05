import React from 'react';

const Button = props => {
  const { click, prompt } = props;

  return (
    <div style={{ display: 'inline' }}>
      <button onClick={click}>{prompt}</button>
    </div>
  );
};

export default Button;
