import React, { useState } from 'react';
import Header from './components/header/header';
import Sidebar from './components/sidebar/Sidebar';
import DashboardCard from './components/dashboardCard/DashboardCard';
import Logeo from './components/logeo/logeo';
import Inventario from './components/inventario/inventario';
import Proveedores from './components/proveedores/Proveedores';
import Productos from './components/productos/Productos';
import './App.css';

// App principal: controla navegación (sin router) y comunicación de sucursales
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [cafeteriaSeleccionada, setCafeteriaSeleccionada] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Navegación: establece vista y sucursal seleccionada si aplica
  const handleNavigation = (view, cafeteriaId = null) => {
    if (view === 'inventario' || view === 'productos') {
      setCafeteriaSeleccionada(cafeteriaId);
    }
    setCurrentView(view);
    closeSidebar();
  };

  // Datos de cafeterías (se utilizan en Dashboard y como fuente de submenús)
  const cafeteriaData = [
    { id: 1, name: 'Cafeteria 1', status: 'green', image: 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=C1' },
    { id: 2, name: 'Cafetería 2', status: 'orange', image: 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=C2' },
    { id: 3, name: 'Cafetería 3', status: 'red', image: 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=C3' },
    { id: 4, name: 'Cafetería 4', status: 'red', image: 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=C4' }
  ];

  // Renderiza vista según currentView
  const renderContent = () => {
    switch (currentView) {
      case 'logeo':
        // Vista de registro de usuario
        return <Logeo />;
      case 'inventario':
        // Vista de inventario por sucursal seleccionada
        return <Inventario cafeteriaId={cafeteriaSeleccionada} />;
      case 'proveedores':
        // Vista de proveedores (CRUD)
        return <Proveedores />;
      case 'productos':
        // Vista de productos por sucursal seleccionada
        return <Productos cafeteriaId={cafeteriaSeleccionada} />;
      case 'dashboard':
      default:
        return (
          <main className="main-content">
            <div className="dashboard-container">
              <h1 className="dashboard-title">Control de Almacenes</h1>
              <div className="cards-grid">
                {cafeteriaData.map(cafeteria => (
                  <DashboardCard
                    key={cafeteria.id}
                    cafeteria={cafeteria.name}
                    storageLevel={cafeteria.status}
                    image={cafeteria.image}
                    // Acción: abrir Inventario con la cafetería seleccionada
                    onVerAlmacen={() => handleNavigation('inventario', cafeteria.name)}
                  />
                ))}
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="App">
      {/* Header con control para abrir/cerrar el sidebar */}
      <Header toggleSidebar={toggleSidebar} />
      {/* Sidebar con navegación y submenús de sucursales */}
      <Sidebar 
        isOpen={sidebarOpen} 
        closeSidebar={closeSidebar}
        onNavigate={handleNavigation}
        sucursales={cafeteriaData}
        currentView={currentView}
      />
      {renderContent()}
    </div>
  );
}

export default App;