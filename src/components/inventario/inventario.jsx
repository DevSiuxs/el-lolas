import React, { useState } from 'react';
import './inventario.css';

const Inventario = ({ cafeteriaId }) => {
  // Datos de ejemplo para el inventario
  const [inventario, setInventario] = useState([
    {
      id: 1,
      nombre: 'Café Premium',
      categoria: 'Bebidas Calientes',
      precio: 25.50,
      cantidadActual: 45,
      cantidadMinima: 10,
      cantidadMaxima: 100,
      marca: 'Café del Valle',
      proveedor: 'Distribuidora Central',
      codigoBarras: '7501234567890',
      ubicacion: 'Almacén A',
      fechaCaducidad: '2024-12-31',
      estado: 'green'
    },
    {
      id: 2,
      nombre: 'Leche Entera',
      categoria: 'Lácteos',
      precio: 18.00,
      cantidadActual: 8,
      cantidadMinima: 15,
      cantidadMaxima: 50,
      marca: 'Lactosa',
      proveedor: 'Lácteos Nacionales',
      codigoBarras: '7501234567891',
      ubicacion: 'Refrigerador 1',
      fechaCaducidad: '2024-06-15',
      estado: 'red'
    },
    {
      id: 3,
      nombre: 'Azúcar Refinada',
      categoria: 'Endulzantes',
      precio: 12.50,
      cantidadActual: 25,
      cantidadMinima: 5,
      cantidadMaxima: 40,
      marca: 'Dulce Plus',
      proveedor: 'Endulzantes MX',
      codigoBarras: '7501234567892',
      ubicacion: 'Almacén B',
      fechaCaducidad: '2025-03-20',
      estado: 'orange'
    },
    {
      id: 4,
      nombre: 'Vasos Desechables',
      categoria: 'Descartables',
      precio: 45.00,
      cantidadActual: 120,
      cantidadMinima: 50,
      cantidadMaxima: 200,
      marca: 'EcoPack',
      proveedor: 'Papelería Express',
      codigoBarras: '7501234567893',
      ubicacion: 'Almacén C',
      fechaCaducidad: '2026-01-01',
      estado: 'green'
    },
    {
      id: 5,
      nombre: 'Pan de Dulce',
      categoria: 'Panadería',
      precio: 8.00,
      cantidadActual: 3,
      cantidadMinima: 12,
      cantidadMaxima: 60,
      marca: 'Pan Fresco',
      proveedor: 'Panadería Central',
      codigoBarras: '7501234567894',
      ubicacion: 'Mostrador',
      fechaCaducidad: '2024-04-10',
      estado: 'red'
    }
  ]);

  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  // Obtener categorías únicas para el filtro
  const categorias = [...new Set(inventario.map(item => item.categoria))];

  // Filtrar inventario
  const inventarioFiltrado = inventario.filter(item => 
    item.nombre.toLowerCase().includes(filtro.toLowerCase()) &&
    (categoriaFiltro === '' || item.categoria === categoriaFiltro)
  );

  // Calcular estadísticas
  const estadisticas = {
    totalProductos: inventario.length,
    bajoStock: inventario.filter(item => item.estado === 'red').length,
    stockOptimo: inventario.filter(item => item.estado === 'green').length,
    stockMedio: inventario.filter(item => item.estado === 'orange').length
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'green': return '#4CAF50';
      case 'orange': return '#FF9800';
      case 'red': return '#F44336';
      default: return '#757575';
    }
  };

  const getEstadoTexto = (item) => {
    if (item.cantidadActual <= item.cantidadMinima) return 'Stock Crítico';
    if (item.cantidadActual >= item.cantidadMaxima * 0.8) return 'Stock Máximo';
    return 'Stock Normal';
  };

  return (
    <div className="inventario-container">
      <div className="inventario-header">
        <h1>Control de Inventario - {cafeteriaId}</h1>
        <div className="estadisticas">
          <div className="estadistica-card">
            <span className="numero">{estadisticas.totalProductos}</span>
            <span className="label">Total Productos</span>
          </div>
          <div className="estadistica-card verde">
            <span className="numero">{estadisticas.stockOptimo}</span>
            <span className="label">Stock Óptimo</span>
          </div>
          <div className="estadistica-card naranja">
            <span className="numero">{estadisticas.stockMedio}</span>
            <span className="label">Stock Medio</span>
          </div>
          <div className="estadistica-card rojo">
            <span className="numero">{estadisticas.bajoStock}</span>
            <span className="label">Bajo Stock</span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <div className="filtro-group">
          <label>Buscar Producto:</label>
          <input
            type="text"
            placeholder="Nombre del producto..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="filtro-group">
          <label>Categoría:</label>
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de Inventario */}
      <div className="tabla-container">
        <table className="inventario-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock Actual</th>
              <th>Stock Mín/Máx</th>
              <th>Estado</th>
              <th>Marca</th>
              <th>Proveedor</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventarioFiltrado.map(producto => (
              <tr key={producto.id} className={`fila-estado-${producto.estado}`}>
                <td>
                  <div className="producto-info">
                    <strong>{producto.nombre}</strong>
                    <small>{producto.codigoBarras}</small>
                  </div>
                </td>
                <td>{producto.categoria}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>
                  <span className="cantidad-actual">{producto.cantidadActual}</span>
                </td>
                <td>
                  <div className="stock-range">
                    <span>Mín: {producto.cantidadMinima}</span>
                    <span>Máx: {producto.cantidadMaxima}</span>
                  </div>
                </td>
                <td>
                  <span 
                    className="estado-badge"
                    style={{ backgroundColor: getEstadoColor(producto.estado) }}
                  >
                    {getEstadoTexto(producto)}
                  </span>
                </td>
                <td>{producto.marca}</td>
                <td>{producto.proveedor}</td>
                <td>{producto.ubicacion}</td>
                <td>
                  <div className="acciones">
                    <button className="btn-editar">Editar</button>
                    <button className="btn-ajustar">Ajustar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Información adicional importante */}
      <div className="informacion-importante">
        <h3>Información Importante para el Control de Inventario</h3>
        <div className="info-grid">
          <div className="info-item">
            <h4>📊 Indicadores de Stock</h4>
            <ul>
              <li><span className="verde">●</span> Verde: Stock entre mínimo y 80% del máximo</li>
              <li><span className="naranja">●</span> Naranja: Stock cerca del mínimo (10-20%)</li>
              <li><span className="rojo">●</span> Rojo: Stock por debajo del mínimo o crítico</li>
            </ul>
          </div>
          <div className="info-item">
            <h4>📦 Gestión de Inventario</h4>
            <ul>
              <li>Revisar stock crítico diariamente</li>
              <li>Realizar conteos físicos semanales</li>
              <li>Actualizar precios según proveedor</li>
              <li>Verificar fechas de caducidad</li>
            </ul>
          </div>
          <div className="info-item">
            <h4>📋 Datos Clave a Monitorear</h4>
            <ul>
              <li>Rotación de inventario</li>
              <li>Productos más vendidos</li>
              <li>Proveedores confiables</li>
              <li>Mermas y pérdidas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;