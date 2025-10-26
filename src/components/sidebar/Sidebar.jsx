import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar, onNavigate }) => { // ← Agrega onNavigate aquí
  const menuItems = [
<<<<<<< HEAD
    'Dashboard',
    'Ventas',
    'Inventario',
    'Reportes',
    'Logeo de Usuario', 
    'Configuración',
    'Ayuda',
    'Cerrar Sesión'
=======
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Ventas', path: '/ventas' },
    { name: 'Inventario', path: '/inventario' },
    { name: 'Reportes', path: '/reportes' },
    { name: 'Configuración', path: '/configuracion' },
    { name: 'Ayuda', path: '/ayuda' },
    { name: 'Cerrar Sesión', path: '/logout' }
>>>>>>> 032b18bebee61f6fb5ae366c3f39d2bddb3590cb
  ];

  const handleMenuItemClick = (item) => {
    if (item === 'Logeo de Usuario') {
      onNavigate('logeo'); // ← Llama a onNavigate con 'logeo'
    } else if (item === 'Dashboard') {
      onNavigate('dashboard'); // ← Para volver al dashboard
    }
    // Para otros items podrías agregar más casos
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
<<<<<<< HEAD
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuItemClick(item);
                  }}
                >
                  {item}
                </a>
=======
                <Link 
                  to={item.path} 
                  onClick={closeSidebar}
                  className="sidebar-link"
                >
                  {item.name}
                </Link>
>>>>>>> 032b18bebee61f6fb5ae366c3f39d2bddb3590cb
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;