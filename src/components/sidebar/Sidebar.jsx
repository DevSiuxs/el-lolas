import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar, onNavigate }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Ventas', path: '/ventas' },
    { name: 'Inventario', path: '/inventario' },
    { name: 'Reportes', path: '/reportes' },
    { name: 'Logeo de Usuario', path: '/logeo' },
    { name: 'Configuración', path: '/configuracion' },
    { name: 'Ayuda', path: '/ayuda' },
    { name: 'Cerrar Sesión', path: '/logout' }
  ];

  const handleMenuItemClick = (item) => {
    if (item.name === 'Logeo de Usuario') {
      onNavigate('logeo');
    } else if (item.name === 'Dashboard') {
      onNavigate('dashboard');
    }
    closeSidebar();
  };

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
                  onClick={() => handleMenuItemClick(item)}
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