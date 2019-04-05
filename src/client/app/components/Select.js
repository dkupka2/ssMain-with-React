import React from 'react';

const Select = props => {
  const { prompt, value, change, options } = props;

  return (
    <div style={{ marginBottom: '20px', display: 'inherit' }}>
      <p style={{ display: 'inline' }}>{prompt}</p>
      <select style={{ marginLeft: '15px' }} value={value} onChange={change}>
        {options}
      </select>
    </div>
  );
};

export default Select;
