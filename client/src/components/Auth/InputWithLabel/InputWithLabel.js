import React from 'react';
import './InputWithLabel.scss'

const InputWithLabel = ({label, ...rest}) => {
  return (
    <div className='input-with-label'>
      <div className='label'>{label}</div>
      <input className='input' {...rest}/>
    </div>
  );
};

export default InputWithLabel;