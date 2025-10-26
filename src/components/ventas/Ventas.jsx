import React from 'react';
import DashboardCard from '../dashboardCard/DashboardCard';
import './ventas.css';

// Importar las imágenes directamente
import bebidasCalientes from '../../assets/lolas.jpeg';
import bebidasFrias from '../../assets/lolas.jpeg'; // Usa la misma temporalmente
import refrescos from '../../assets/lolas.jpeg'; // Usa la misma temporalmente
import snacks from '../../assets/lolas.jpeg'; // Usa la misma temporalmente

const Ventas = () => {
  // Datos de las 4 categorías de ventas con imports directos
  const categoriasVentas = [
    {
      id: 1,
      nombre: 'Bebidas Calientes',
      estado: 'green',
      imagen: bebidasCalientes, // ← Usa la variable importada
      descripcion: 'Cafés, tés, chocolates'
    },
    {
      id: 2,
      nombre: 'Bebidas Frías',
      estado: 'green',
      imagen: bebidasFrias, // ← Usa la variable importada
      descripcion: 'Smoothies, jugos, bebidas heladas'
    },
    {
      id: 3,
      nombre: 'Refrescos',
      estado: 'orange',
      imagen: refrescos, // ← Usa la variable importada
      descripcion: 'Refrescos y sodas'
    },
    {
      id: 4,
      nombre: 'Snacks',
      estado: 'green',
      imagen: snacks, // ← Usa la variable importada
      descripcion: 'Botanas y alimentos ligeros'
    }
  ];

  const manejarClicCategoria = (categoriaNombre) => {
    console.log(`Navegando a productos de: ${categoriaNombre}`);
    alert(`Ver productos de: ${categoriaNombre}`);
  };

  return (
    <div className="ventas-container">
      <header className="ventas-header">
        <h1>Ventas</h1>
        <p className="ventas-subtitle">Selecciona una categoría para ver los productos</p>
      </header>

      <div className="categorias-grid">
        {categoriasVentas.map(categoria => (
          <div 
            key={categoria.id} 
            onClick={() => manejarClicCategoria(categoria.nombre)}
            className="categoria-item"
          >
            <DashboardCard
              cafeteria={categoria.nombre}
              storageLevel={categoria.estado}
              image={categoria.imagen} // ← Pasa la imagen importada
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ventas;