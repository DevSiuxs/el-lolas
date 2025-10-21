import React, { useState } from 'react';
import Header from './components/header/header';
import Sidebar from './components/sidebar/Sidebar';
import DashboardCard from './components/dashboardCard/DashboardCard';
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

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      
      <main className="main-content">
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
      </main>
    </div>
  );
}

export default App;