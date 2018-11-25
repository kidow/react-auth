import React from 'react';
import './Header.scss'

const Header = ({children}) => {
  return (
    <div className='positioner'>
      <div className='white-background'>
        <div className='header-contents'>
          <div className='logo'>KIDOW</div>
          <div className='spacer'/>
          {children}
        </div>
      </div>
      <div className='gradient-border'/>
    </div>
  );
};

export default Header;