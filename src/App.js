import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Sidebar from './components/sidebar/Sidebar';
import DashboardCard from './components/dashboardCard/DashboardCard';
<<<<<<< HEAD
import Logeo from './components/logeo/logeo';
=======
import Ventas from './components/ventas/Ventas'; 
>>>>>>> 032b18bebee61f6fb5ae366c3f39d2bddb3590cb
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); 

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleNavigation = (view) => {
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
        return <Logeo/>;
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
                    image={cafeteria.image} // ← Usa la imagen del objeto
                  />
                ))}
              </div>
            </div>
          </main>
        );
    }
  };

<<<<<<< HEAD
  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar 
        isOpen={sidebarOpen} 
        closeSidebar={closeSidebar}
        onNavigate={handleNavigation} 
      />
      {renderContent()}
=======

  const Dashboard = () => (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Control de Almacenes</h1>
      <div className="cards-grid">
        {cafeteriaData.map(cafeteria => (
          <DashboardCard
            key={cafeteria.id}
            cafeteria={cafeteria.name}
            storageLevel={cafeteria.status}
            image={`/assets/cafeteria-${cafeteria.id}.png`}
          />
        ))}
      </div>
>>>>>>> 032b18bebee61f6fb5ae366c3f39d2bddb3590cb
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
        
        <main className="main-content">
          <Routes>
            {/* Ruta para el Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Ruta para Ventas */}
            <Route path="/ventas" element={<Ventas />} />
            
            {/* Puedes agregar rutas para los otros componentes después */}
            <Route path="/inventario" element={<div className="dashboard-container"><h1>Inventario - En construcción</h1></div>} />
            <Route path="/reportes" element={<div className="dashboard-container"><h1>Reportes - En construcción</h1></div>} />
            <Route path="/configuracion" element={<div className="dashboard-container"><h1>Configuración - En construcción</h1></div>} />
            <Route path="/ayuda" element={<div className="dashboard-container"><h1>Ayuda - En construcción</h1></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;