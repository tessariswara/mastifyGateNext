import React from 'react';
import Navbar from './navbar';
import '../app/globals.css'
import Style from '@/app/login.module.css'

const NavbarTemplate = (Body: React.ComponentType<any>) => {
  const Template: React.FC<any> = (props) => {
    return (
      <div className={Style.layout}>
        <Navbar />
        <Body  {...props} />
      </div>
    );
  };

  return Template;
};

export default NavbarTemplate;
