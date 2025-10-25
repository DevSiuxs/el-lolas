import React from 'react';
import DashboardCard from '../dashboardCard/DashboardCard'; // Usamos el componente de tu compañero
import './ventas.css';

const Ventas = () => {
  // Datos de las 4 categorías de ventas
  const categoriasVentas = [
    {
      id: 1,
      nombre: 'Bebidas Calientes',
      estado: 'green', // green, orange, red
      imagen: '/assets/bebidas-calientes.jpg',
      descripcion: 'Cafés, tés, chocolates'
    },
    {
      id: 2,
      nombre: 'Bebidas Frías',
      estado: 'green',
      imagen: '/assets/bebidas-frias.jpg',
      descripcion: 'Smoothies, jugos, bebidas heladas'
    },
    {
      id: 3,
      nombre: 'Refrescos',
      estado: 'orange',
      imagen: '/assets/refrescos.jpg',
      descripcion: 'Refrescos y sodas'
    },
    {
      id: 4,
      nombre: 'Snacks',
      estado: 'green',
      imagen: '/assets/snacks.jpg',
      descripcion: 'Botanas y alimentos ligeros'
    }
  ];

  // Función para manejar el clic en cada categoría
  const manejarClicCategoria = (categoriaNombre) => {
    console.log(`Navegando a productos de: ${categoriaNombre}`);
    // Aquí puedes:
    // 1. Navegar a otra pantalla
    // 2. Mostrar productos de esa categoría
    // 3. Filtrar productos, etc.
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
          <DashboardCard
            key={categoria.id}
            cafeteria={categoria.nombre}
            storageLevel={categoria.estado}
            image={categoria.imagen}
            // Podemos "hackear" las props para adaptarlas a ventas
          />
        ))}
      </div>
    </div>
  );
};

export default Ventas;