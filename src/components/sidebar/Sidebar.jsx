import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Ventas', path: '/ventas' },
    { name: 'Inventario', path: '/inventario' },
    { name: 'Reportes', path: '/reportes' },
    { name: 'Configuración', path: '/configuracion' },
    { name: 'Ayuda', path: '/ayuda' },
    { name: 'Cerrar Sesión', path: '/logout' }
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>Menu</span>
          </div>
          <button className="close-btn" onClick={closeSidebar}>×</button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  onClick={closeSidebar}
                  className="sidebar-link"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;