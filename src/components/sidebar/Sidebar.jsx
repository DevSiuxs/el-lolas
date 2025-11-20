import React, { useMemo, useState } from 'react';
import './Sidebar.css';

// Sidebar de navegación principal
// Props:
// - isOpen: estado visible/oculto del sidebar
// - closeSidebar: función para cerrar el sidebar
// - onNavigate: manejador de navegación (vista [, sucursal])
// - sucursales: listado para submenús de Inventario/Productos
// - currentView: vista actual para resaltar elemento activo
const Sidebar = ({ isOpen, closeSidebar, onNavigate, sucursales = [], currentView }) => {
  // Estado de despliegue de submenús
  const [inventarioOpen, setInventarioOpen] = useState(false);
  const [productosOpen, setProductosOpen] = useState(false);
  const getStatusColor = (status) => {
    switch (status) {
      case 'green':
        return '#4CAF50';
      case 'orange':
        return '#FF9800';
      case 'red':
        return '#F44336';
      default:
        return '#4CAF50';
    }
  };
  // Menú principal
  const menuItems = useMemo(() => ([
    { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { key: 'ventas', label: 'Ventas', icon: '🧾' },
    { key: 'inventario', label: 'Inventario', icon: '📦' },
    { key: 'productos', label: 'Productos', icon: '🍵' },
    { key: 'proveedores', label: 'Proveedores', icon: '🤝' },
    { key: 'reportes', label: 'Reportes', icon: '📊' },
    { key: 'logeo', label: 'Logeo de Usuario', icon: '👤' },
    { key: 'configuracion', label: 'Configuración', icon: '⚙️' },
    { key: 'ayuda', label: 'Ayuda', icon: '❓' },
    { key: 'logout', label: 'Cerrar Sesión', icon: '⏻' },
  ]), []);

  // Navegación genérica (sin submenús)
  const handleMenuItemClick = (item) => {
    if (item.key === 'inventario') {
      setInventarioOpen((prev) => !prev);
      return;
    }
    if (item.key === 'logout') {
      closeSidebar();
      return;
    }
    onNavigate(item.key);
    closeSidebar();
  };

  return (
    <>
      {/* Overlay para cerrar al hacer click fuera */}
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      {/* Drawer lateral con encabezado y navegación */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Encabezado con logo y botón de cierre */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>Ventas System</span>
          </div>
          <button className="close-btn" onClick={closeSidebar}>×</button>
        </div>
        {/* Menú principal con submenús para Inventario/Productos */}
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.key === 'inventario' ? (
                  <>
                    {/* Fila: botón de sección + caret para abrir submenú */}
                    <div className="menu-row tight">
                      <button
                        type="button"
                        className={`menu-btn ${currentView === 'inventario' ? 'active' : ''}`}
                        onClick={() => {
                          onNavigate('inventario');
                          closeSidebar();
                        }}
                      >
                        <span className="menu-icon" aria-hidden="true">{item.icon}</span>
                        <span className="menu-label">{item.label}</span>
                      </button>
                      <button
                        type="button"
                        className={`menu-inline-caret-btn ${inventarioOpen ? 'open' : ''}`}
                        aria-expanded={inventarioOpen}
                        aria-controls="submenu-inventario"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInventarioOpen((prev) => !prev);
                        }}
                        title={inventarioOpen ? 'Ocultar sucursales' : 'Mostrar sucursales'}
                      >
                        <span className={`menu-caret ${inventarioOpen ? 'open' : ''}`} aria-hidden="true">▸</span>
                      </button>
                    </div>
                    {/* Submenú de sucursales para Inventario */}
                    {inventarioOpen && (
                      <ul id="submenu-inventario" className="submenu">
                        {sucursales.map((sucursal) => (
                          <li key={sucursal.id}>
                            <button
                              type="button"
                              className="submenu-btn"
                              onClick={() => {
                                onNavigate('inventario', sucursal.name);
                                closeSidebar();
                              }}
                            >
                              <span className="submenu-name">
                                <span className="submenu-dot" style={{ backgroundColor: getStatusColor(sucursal.status) }} />
                                {sucursal.name}
                              </span>
                              {typeof sucursal.stockPercent === 'number' && (
                                <span className="submenu-percent" style={{ backgroundColor: getStatusColor(sucursal.status), color: '#fff' }}>
                                  {sucursal.stockPercent}%
                                </span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : item.key === 'productos' ? (
                  <>
                    {/* Fila: botón de sección + caret para abrir submenú */}
                    <div className="menu-row tight">
                      <button
                        type="button"
                        className={`menu-btn ${currentView === 'productos' ? 'active' : ''}`}
                        onClick={() => {
                          onNavigate('productos');
                          closeSidebar();
                        }}
                      >
                        <span className="menu-icon" aria-hidden="true">{item.icon}</span>
                        <span className="menu-label">{item.label}</span>
                      </button>
                      <button
                        type="button"
                        className={`menu-inline-caret-btn ${productosOpen ? 'open' : ''}`}
                        aria-expanded={productosOpen}
                        aria-controls="submenu-productos"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProductosOpen((prev) => !prev);
                        }}
                        title={productosOpen ? 'Ocultar sucursales' : 'Mostrar sucursales'}
                      >
                        <span className={`menu-caret ${productosOpen ? 'open' : ''}`} aria-hidden="true">▸</span>
                      </button>
                    </div>
                    {/* Submenú de sucursales para Productos */}
                    {productosOpen && (
                      <ul id="submenu-productos" className="submenu">
                        {sucursales.map((sucursal) => (
                          <li key={sucursal.id}>
                            <button
                              type="button"
                              className="submenu-btn"
                              onClick={() => {
                                onNavigate('productos', sucursal.name);
                                closeSidebar();
                              }}
                            >
                              <span className="submenu-name">
                                <span className="submenu-dot" style={{ backgroundColor: getStatusColor(sucursal.status) }} />
                                {sucursal.name}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    className={`menu-btn ${currentView === item.key ? 'active' : ''} ${item.key === 'logout' ? 'logout' : ''}`}
                    onClick={() => handleMenuItemClick(item)}
                  >
                    <span className="menu-icon" aria-hidden="true">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;