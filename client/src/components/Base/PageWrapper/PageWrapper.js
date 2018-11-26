import React from 'react';
import './PageWrapper.scss'

const PageWrapper = ({children, responsive}) => {
  return (
    <div className='page-wrapper' responsive={responsive}>
      {children}
    </div>
  );
};

export default PageWrapper;