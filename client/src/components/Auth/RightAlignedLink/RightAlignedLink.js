import React from 'react';
import { Link } from 'react-router-dom'
import './RightAlignedLink.scss'

const RightAlignedLink = ({to, children}) => {
  return (
    <div className='aligner'>
      <Link className='styled-link' to={to}>{children}</Link>
    </div>
  );
};

export default RightAlignedLink;