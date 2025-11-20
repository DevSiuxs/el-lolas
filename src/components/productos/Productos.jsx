import React, { useEffect, useMemo, useState } from 'react';
import './Productos.css';

// Vista de Productos por sucursal:
// - Permite activar/desactivar venta del producto por sucursal
// - Edita precio de venta y receta por sucursal
// - Edita datos base del producto (nombre, categoría, etc.)
const Productos = ({ cafeteriaId }) => {
  // Catálogo base de sucursales
  const sucursalesBase = useMemo(() => ([
    { id: 1, name: 'Sucursal 1' },
    { id: 2, name: 'Sucursal 2' },
    { id: 3, name: 'Sucursal 3' },
    { id: 4, name: 'Sucursal 4' },
    { id: 5, name: 'Sucursal 5' },
  ]), []);

  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(cafeteriaId || null);
  // Se toma el inventario base desde localStorage para construir los productos
  const inventarioBase = useMemo(() => {
    try {
      const raw = localStorage.getItem('inventarioBase');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  // Construye la estructura inicial por sucursal para cada producto
  const buildInitial = () => {
    const byName = (p) => sucursalesBase[((p.id || 1) - 1) % sucursalesBase.length].name;
    return (inventarioBase || []).map(p => ({
      id: p.id,
      nombre: p.nombre,
      categoria: p.categoria,
      marca: p.marca,
      proveedor: p.proveedor,
      codigoBarras: p.codigoBarras,
      porSucursal: sucursalesBase.reduce((acc, s) => {
        acc[s.name] = { activo: true, precioVenta: p.precioVenta, receta: '' };
        return acc;
      }, {}),
      sucursalDef: p.sucursal || byName(p)
    }));
  };

  // Estado principal: productos con datos por sucursal
  const [productos, setProductos] = useState(() => {
    try {
      const raw = localStorage.getItem('productosSucursal');
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && Array.isArray(parsed) && parsed.length) return parsed;
    } catch {}
    return buildInitial();
  });

  // Persistencia en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('productosSucursal', JSON.stringify(productos));
    } catch {}
  }, [productos]);

  useEffect(() => {
    setSucursalSeleccionada(cafeteriaId || null);
  }, [cafeteriaId]);

  const [filtro, setFiltro] = useState('');
  const [sortBy, setSortBy] = useState('nombre');
  const [sortDir, setSortDir] = useState('asc');
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);
  const [modalReceta, setModalReceta] = useState(null);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalNuevo, setModalNuevo] = useState(false);

  // Productos visibles de la sucursal seleccionada
  const productosSucursal = useMemo(() => {
    return productos.filter(p => p.porSucursal[sucursalSeleccionada]);
  }, [productos, sucursalSeleccionada]);

  // Filtro y ordenamiento
  const productosFiltrados = useMemo(() => {
    const q = filtro.trim().toLowerCase();
    const arr = productosSucursal.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      (p.categoria || '').toLowerCase().includes(q) ||
      (p.marca || '').toLowerCase().includes(q) ||
      (p.proveedor || '').toLowerCase().includes(q)
    );
    const dir = sortDir === 'asc' ? 1 : -1;
    const sorted = [...arr].sort((a, b) => {
      const va = sortBy === 'precioVenta' ? (a.porSucursal[sucursalSeleccionada]?.precioVenta || 0) : (a[sortBy] || '');
      const vb = sortBy === 'precioVenta' ? (b.porSucursal[sucursalSeleccionada]?.precioVenta || 0) : (b[sortBy] || '');
      if (typeof va === 'string' && typeof vb === 'string') return va.localeCompare(vb) * dir;
      return (va - vb) * dir;
    });
    return sorted;
  }, [productosSucursal, filtro, sortBy, sortDir, sucursalSeleccionada]);

  // Cambiar criterio de orden
  const cambiarOrden = (clave) => {
    if (sortBy === clave) setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortBy(clave); setSortDir('asc'); }
  };

  // Alterna activo/no activo del producto en la sucursal
  const toggleActivo = (id) => {
    setProductos(prev => prev.map(p => {
      if (p.id !== id) return p;
      const curr = p.porSucursal[sucursalSeleccionada];
      return { ...p, porSucursal: { ...p.porSucursal, [sucursalSeleccionada]: { ...curr, activo: !curr.activo } } };
    }));
  };

  // Guarda precio de venta por sucursal
  const guardarPrecio = (id, precio) => {
    setProductos(prev => prev.map(p => {
      if (p.id !== id) return p;
      const curr = p.porSucursal[sucursalSeleccionada];
      return { ...p, porSucursal: { ...p.porSucursal, [sucursalSeleccionada]: { ...curr, precioVenta: Number(precio) || 0 } } };
    }));
  };

  const abrirReceta = (p) => setModalReceta(p);
  const cerrarReceta = () => setModalReceta(null);
  // Guarda receta por sucursal
  const guardarReceta = (id, receta) => {
    setProductos(prev => prev.map(p => {
      if (p.id !== id) return p;
      const curr = p.porSucursal[sucursalSeleccionada];
      return { ...p, porSucursal: { ...p.porSucursal, [sucursalSeleccionada]: { ...curr, receta } } };
    }));
    cerrarReceta();
  };

  const abrirEditar = (p) => setModalEditar(p);
  const cerrarEditar = () => setModalEditar(null);
  // Guarda edición de datos base del producto
  const guardarEditar = (data) => {
    setProductos(prev => prev.map(p => (p.id === data.id ? { ...p, nombre: data.nombre, categoria: data.categoria, marca: data.marca, proveedor: data.proveedor, codigoBarras: data.codigoBarras } : p)));
    cerrarEditar();
  };

  // Crea un nuevo producto y genera entradas por todas las sucursales
  const crearNuevo = (e) => {
    e.preventDefault();
    const f = e.target;
    const nombre = f.nombre.value.trim();
    if (!nombre) return;
    const base = {
      id: Date.now(),
      nombre,
      categoria: f.categoria.value.trim(),
      marca: f.marca.value.trim(),
      proveedor: f.proveedor.value.trim(),
      codigoBarras: f.codigoBarras.value.trim(),
      porSucursal: sucursalesBase.reduce((acc, s) => { acc[s.name] = { activo: true, precioVenta: Number(f.precioVenta.value) || 0, receta: '' }; return acc; }, {})
    };
    setProductos(prev => [base, ...prev]);
    setModalNuevo(false);
    e.target.reset();
  };

  // Elimina un producto
  const eliminarProducto = (id) => {
    if (!window.confirm('¿Eliminar producto?')) return;
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  // Métrica: porcentaje de productos activos en la sucursal
  const activosPercent = useMemo(() => {
    const total = productosSucursal.length;
    const activos = productosSucursal.filter(p => p.porSucursal[sucursalSeleccionada]?.activo).length;
    if (total <= 0) return 0;
    return Math.round(100 * activos / total);
  }, [productosSucursal, sucursalSeleccionada]);

  return (
    <div className="productos-container">
      {!sucursalSeleccionada && (
          <div className="productos-overview">
            <h1 className="productos-title">Productos por Sucursales</h1>
            <div className="productos-overview-grid">
              {sucursalesBase.map(s => (
                <div key={s.id} className="productos-overview-card" onClick={() => setSucursalSeleccionada(s.name)} role="button" title={`Ver productos de ${s.name}`}>
                  <div className="productos-overview-indicator" />
                  <div className="productos-overview-info">
                    <h3>{s.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
      )}

      {sucursalSeleccionada && (
        <>
          <div className="productos-header">
            <div className="breadcrumb">
              <button className="breadcrumb-back" aria-label="Regresar" onClick={() => setSucursalSeleccionada(null)}>←</button>
              <button className="breadcrumb-link" onClick={() => setSucursalSeleccionada(null)}>Productos</button>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{sucursalSeleccionada}</span>
            </div>
            <div className="estadisticas">
              <div className="estadistica-card">
                <span className="numero">{activosPercent}%</span>
                <span className="label">Activos en sucursal</span>
              </div>
            </div>
          </div>

          <div className="filtros">
            <div className="filtro-group">
              <label>Buscar Producto:</label>
              <input type="text" placeholder="Nombre, categoría, proveedor..." value={filtro} onChange={(e) => setFiltro(e.target.value)} />
            </div>
            <div className="orden-indicador">
              <span>Orden: {sortBy} ({sortDir})</span>
            </div>
            <div className="acciones-header">
              <button className="btn-primario" onClick={() => setModalNuevo(true)}>Nuevo Producto</button>
            </div>
          </div>

          <div className="tabla-container">
            <table className="productos-table">
              <thead>
                <tr>
                  <th>Sel</th>
                  <th onClick={() => cambiarOrden('nombre')}>Producto</th>
                  <th onClick={() => cambiarOrden('categoria')}>Categoría</th>
                  <th>Activo</th>
                  <th onClick={() => cambiarOrden('precioVenta')}>Precio Venta</th>
                  <th>Receta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map(p => {
                  const ps = p.porSucursal[sucursalSeleccionada] || { activo: false, precioVenta: 0, receta: '' };
                  return (
                    <tr key={p.id}>
                      <td>
                        <input type="checkbox" checked={productoSeleccionadoId === p.id} onChange={(e) => setProductoSeleccionadoId(e.target.checked ? p.id : null)} />
                      </td>
                      <td>
                        <div className="producto-info">
                          <strong>{p.nombre}</strong>
                          <small>{p.codigoBarras}</small>
                        </div>
                      </td>
                      <td>{p.categoria || '-'}</td>
                      <td>
                        <label className="switch">
                          <input type="checkbox" checked={!!ps.activo} onChange={() => toggleActivo(p.id)} />
                          <span className="slider" />
                        </label>
                      </td>
                      <td>
                        <div className="precio-edit">
                          <input type="number" step="0.01" defaultValue={ps.precioVenta} onBlur={(e) => guardarPrecio(p.id, e.target.value)} />
                        </div>
                      </td>
                      <td>
                        <button className="btn-accion" onClick={() => abrirReceta(p)} disabled={!productoSeleccionadoId || productoSeleccionadoId !== p.id}>Editar</button>
                      </td>
                      <td className="acciones-cell">
                        <button className="btn-accion" onClick={() => abrirEditar(p)}>Editar producto</button>
                        <button className="btn-peligro" onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                      </td>
                    </tr>
                  );
                })}
                {productosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="7" className="empty">Sin resultados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {modalReceta && (
            <div className="modal-overlay" onClick={cerrarReceta}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Editar receta</h3>
                <form onSubmit={(e) => { e.preventDefault(); const receta = e.target.receta.value; guardarReceta(modalReceta.id, receta); }}>
                  <div className="form-grid">
                    <label className="full">
                      Receta
                      <textarea name="receta" defaultValue={(modalReceta.porSucursal[sucursalSeleccionada]?.receta) || ''} />
                    </label>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-cancelar" onClick={cerrarReceta}>Cancelar</button>
                    <button type="submit" className="btn-guardar">Guardar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {modalEditar && (
            <div className="modal-overlay" onClick={cerrarEditar}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Editar producto</h3>
                <form onSubmit={(e) => { e.preventDefault(); const f = e.target; guardarEditar({ id: modalEditar.id, nombre: f.nombre.value, categoria: f.categoria.value, marca: f.marca.value, proveedor: f.proveedor.value, codigoBarras: f.codigoBarras.value }); }}>
                  <div className="form-grid">
                    <label>Nombre<input name="nombre" defaultValue={modalEditar.nombre} required /></label>
                    <label>Categoría<input name="categoria" defaultValue={modalEditar.categoria || ''} /></label>
                    <label>Marca<input name="marca" defaultValue={modalEditar.marca || ''} /></label>
                    <label>Proveedor<input name="proveedor" defaultValue={modalEditar.proveedor || ''} /></label>
                    <label className="full">Código de Barras<input name="codigoBarras" defaultValue={modalEditar.codigoBarras || ''} /></label>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-cancelar" onClick={cerrarEditar}>Cancelar</button>
                    <button type="submit" className="btn-guardar">Guardar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {modalNuevo && (
            <div className="modal-overlay" onClick={() => setModalNuevo(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Nuevo producto</h3>
                <form onSubmit={crearNuevo}>
                  <div className="form-grid">
                    <label>Nombre<input name="nombre" required /></label>
                    <label>Categoría<input name="categoria" /></label>
                    <label>Marca<input name="marca" /></label>
                    <label>Proveedor<input name="proveedor" /></label>
                    <label>Código de Barras<input name="codigoBarras" /></label>
                    <label className="full">Precio Venta Inicial<input name="precioVenta" type="number" step="0.01" defaultValue={0} /></label>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-cancelar" onClick={() => setModalNuevo(false)}>Cancelar</button>
                    <button type="submit" className="btn-guardar">Crear</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Productos;