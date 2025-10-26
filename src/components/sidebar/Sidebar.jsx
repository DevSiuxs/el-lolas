import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar, onNavigate }) => { // ← Agrega onNavigate aquí
  const menuItems = [
    'Dashboard',
    'Ventas',
    'Inventario',
    'Reportes',
    'Logeo de Usuario', 
    'Configuración',
    'Ayuda',
    'Cerrar Sesión'
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
            <span>Ventas System</span>
          </div>
          <button className="close-btn" onClick={closeSidebar}>×</button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuItemClick(item);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;