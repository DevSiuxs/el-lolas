import React, { useState } from 'react';
import Header from './components/header/header';
import Sidebar from './components/sidebar/Sidebar';
import DashboardCard from './components/dashboardCard/DashboardCard';
import Logeo from './components/logeo/logeo';
import Inventario from './components/inventario/inventario';
import './App.css';

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

  const handleNavigation = (view, cafeteriaId = null) => {
    if (view === 'inventario') {
      setCafeteriaSeleccionada(cafeteriaId);
    }
    setCurrentView(view);
    closeSidebar();
  };

  const cafeteriaData = [
    { id: 1, name: 'Cafeteria 1', status: 'green', image: 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=C1' },
    { id: 2, name: 'Cafetería 2', status: 'orange', image: 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=C2' },
    { id: 3, name: 'Cafetería 3', status: 'red', image: 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=C3' },
    { id: 4, name: 'Cafetería 4', status: 'red', image: 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=C4' }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'logeo':
        return <Logeo />;
      case 'inventario':
        return <Inventario cafeteriaId={cafeteriaSeleccionada} />;
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
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar 
        isOpen={sidebarOpen} 
        closeSidebar={closeSidebar}
        onNavigate={handleNavigation}
      />
      {renderContent()}
    </div>
  );
}

export default App;