import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ cafeteria, storageLevel, image, onVerAlmacen }) => {
  const getStatusColor = () => {
    switch (storageLevel) {
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

  const getStatusText = () => {
    switch (storageLevel) {
      case 'green':
        return 'Espacio disponible';
      case 'orange':
        return 'Poco espacio';
      case 'red':
        return 'Sin espacio';
      default:
        return 'Espacio disponible';
    }
  };

  const handleImageError = (e) => {
    console.log('Error cargando imagen:', image);
    e.target.src = 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=CAFE';
    e.target.alt = 'Imagen no disponible';
  };

  return (
    <div className="dashboard-card">
      <div 
        className="storage-indicator"
        style={{ backgroundColor: getStatusColor() }}
        title={getStatusText()}
      ></div>
      
      <div className="card-image">
        <img 
          src={image} 
          alt={cafeteria}
          onError={handleImageError}
        />
      </div>
      
      <div className="card-content">
        <h3 className="cafeteria-name">{cafeteria}</h3>
        <p className="storage-status" style={{ color: getStatusColor() }}>
          {getStatusText()}
        </p>
      </div>
      
      <button className="view-storage-btn" onClick={onVerAlmacen}>
        Redirigir a Almacén
      </button>
    </div>
  );
};

export default DashboardCard;