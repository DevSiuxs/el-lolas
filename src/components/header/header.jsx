import React from 'react';
import './header.css';

// Barra superior (Header)
// Props:
// - toggleSidebar: función para abrir/cerrar el menú lateral
const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-content">
        {/* Botón hamburguesa para abrir/cerrar el sidebar */}
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        {/* Logotipo y título de la aplicación */}
        <div className="logo">
          <span className="logo-text">Inventarios</span>
        </div>
      </div>
    </header>
  );
};

export default Header;