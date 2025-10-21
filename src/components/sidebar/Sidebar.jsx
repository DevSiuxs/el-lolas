import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    'Dashboard',
    'Ventas',
    'Inventario',
    'Reportes',
    'Configuración',
    'Ayuda',
    'Cerrar Sesión'
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>Ventas System</span>
          </div>
          <button className="close-btn" onClick={closeSidebar}>×</button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href="#" onClick={closeSidebar}>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;