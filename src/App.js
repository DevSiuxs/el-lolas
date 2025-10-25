import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Sidebar from './components/sidebar/Sidebar';
import DashboardCard from './components/dashboardCard/DashboardCard';
import Ventas from './components/ventas/Ventas'; 
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const cafeteriaData = [
    { id: 1, name: 'Cafetería 1', status: 'green' },
    { id: 2, name: 'Cafetería 2', status: 'orange' },
    { id: 3, name: 'Cafetería 3', status: 'red' },
    { id: 4, name: 'Cafetería 4', status: 'red' }
  ];


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