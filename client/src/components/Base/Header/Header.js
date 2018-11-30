import React from 'react';
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = ({children}) => {
  return (
    <div className='header'>
      <div className='white-background'>
        <div className='header-contents'>
          <Link className='logo' to='/'>KIDOW</Link>
          <div className='spacer'>
            <a href='https://github.com/kidow/react-auth' target='_blank' rel='noopener noreferrer'>https://github.com/kidow/react-auth</a>
          </div>
          {children}
        </div>
      </div>
      <div className='gradient-border'/>
    </div>
  );
};

export default Header;