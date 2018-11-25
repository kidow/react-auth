import React from 'react';
import './InputWithLabel.scss'

const InputWithLabel = ({label, ...rest}) => {
  return (
    <div className='wrapper'>
      <div className='label'>{label}</div>
      <input className='input' {...rest}/>
    </div>
  );
};

export default InputWithLabel;