import React from 'react';
import './DashboardCard.css';

// Tarjeta de dashboard para cada cafetería
// - Muestra estado del almacén (color y texto)
// - Renderiza imagen/logo con fallback si falla
// - Botón para navegar al inventario
const DashboardCard = ({ cafeteria, storageLevel, image, onVerAlmacen }) => {
  // Color por estado del almacén
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

  // Texto por estado del almacén
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

  // Fallback de imagen en caso de error
  const handleImageError = (e) => {
    console.log('Error cargando imagen:', image);
    e.target.src = 'https://via.placeholder.com/60x60/722f37/FFFFFF?text=CAFE';
    e.target.alt = 'Imagen no disponible';
  };

  return (
    <div className="dashboard-card">
      {/* Indicador de estado (esquina superior derecha) */}
      <div 
        className="storage-indicator"
        style={{ backgroundColor: getStatusColor() }}
        title={getStatusText()}
      ></div>
      
      {/* Imagen/logo de la cafetería */}
      <div className="card-image">
        <img 
          src={image} 
          alt={cafeteria}
          onError={handleImageError}
        />
      </div>
      
      {/* Contenido textual */}
      <div className="card-content">
        <h3 className="cafeteria-name">{cafeteria}</h3>
        <p className="storage-status" style={{ color: getStatusColor() }}>
          {getStatusText()}
        </p>
      </div>
      
      {/* Acción: ver almacén de la cafetería */}
      <button className="view-storage-btn" onClick={onVerAlmacen}>
        Redirigir a Almacén
      </button>
    </div>
  );
};

export default DashboardCard;