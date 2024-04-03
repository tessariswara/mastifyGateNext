import React from 'react';
import Navbar from './navbar';
import '../app/globals.css'

const NavbarTemplate = (Body: React.ComponentType<any>) => {
  const Template: React.FC<any> = (props) => {
    return (
      <div>
        <Navbar />
        <Body  {...props} />
      </div>
    );
  };

  return Template;
};

export default NavbarTemplate;
