import React from 'react';
import './header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span>Inventarios</span>
        </div>
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;