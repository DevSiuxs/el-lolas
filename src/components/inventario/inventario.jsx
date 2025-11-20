import React, { useEffect, useMemo, useState } from 'react';
import './inventario.css';

// Pantalla de Inventario para cafeterías
// Esta vista permite: filtrar, ordenar, editar y ajustar cantidades.
// Las funciones y bloques están documentados para facilitar el mantenimiento.
const Inventario = ({ cafeteriaId }) => {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(cafeteriaId || null);
  useEffect(() => {
    setSucursalSeleccionada(cafeteriaId || null);
  }, [cafeteriaId]);

  const sucursalesBase = useMemo(() => ([
    { id: 1, name: 'Sucursal 1' },
    { id: 2, name: 'Sucursal 2' },
    { id: 3, name: 'Sucursal 3' },
    { id: 4, name: 'Sucursal 4' },
    { id: 5, name: 'Sucursal 5' },
  ]), []);
  // Estado principal: listado de productos en inventario
  const [inventario, setInventario] = useState([
    {
      id: 1,
      nombre: 'Café Premium',
      categoria: 'Bebidas Calientes',
      precioCompra: 18.90,
      precioVenta: 25.50,
      cantidadActual: 45,
      cantidadMinima: 10,
      cantidadMaxima: 100,
      marca: 'Café del Valle',
      proveedor: 'Distribuidora Central',
      codigoBarras: '7501234567890',
      fechaCaducidad: '2024-12-31',
      estado: 'green'
    },
    {
      id: 2,
      nombre: 'Leche Entera',
      categoria: 'Lácteos',
      precioCompra: 14.00,
      precioVenta: 18.00,
      cantidadActual: 8,
      cantidadMinima: 15,
      cantidadMaxima: 50,
      marca: 'Lactosa',
      proveedor: 'Lácteos Nacionales',
      codigoBarras: '7501234567891',
      fechaCaducidad: '2024-06-15',
      estado: 'red'
    },
    {
      id: 3,
      nombre: 'Azúcar Refinada',
      categoria: 'Endulzantes',
      precioCompra: 9.30,
      precioVenta: 12.50,
      cantidadActual: 25,
      cantidadMinima: 5,
      cantidadMaxima: 40,
      marca: 'Dulce Plus',
      proveedor: 'Endulzantes MX',
      codigoBarras: '7501234567892',
      fechaCaducidad: '2025-03-20',
      estado: 'orange'
    },
    {
      id: 4,
      nombre: 'Vasos Desechables',
      categoria: 'Descartables',
      precioCompra: 32.00,
      precioVenta: 45.00,
      cantidadActual: 120,
      cantidadMinima: 50,
      cantidadMaxima: 200,
      marca: 'EcoPack',
      proveedor: 'Papelería Express',
      codigoBarras: '7501234567893',
      fechaCaducidad: '2026-01-01',
      estado: 'green'
    },
    {
      id: 5,
      nombre: 'Pan de Dulce',
      categoria: 'Panadería',
      precioCompra: 5.50,
      precioVenta: 8.00,
      cantidadActual: 3,
      cantidadMinima: 12,
      cantidadMaxima: 60,
      marca: 'Pan Fresco',
      proveedor: 'Panadería Central',
      codigoBarras: '7501234567894',
      fechaCaducidad: '2024-04-10',
      estado: 'red'
    },
    {
      id: 6,
      nombre: 'Té Verde',
      categoria: 'Bebidas Calientes',
      precioCompra: 10.00,
      precioVenta: 14.00,
      cantidadActual: 20,
      cantidadMinima: 10,
      cantidadMaxima: 80,
      marca: 'HerbalMix',
      proveedor: 'Infusiones MX',
      codigoBarras: '7501234567895',
      fechaCaducidad: '2025-07-20',
      estado: 'green'
    },
    {
      id: 7,
      nombre: 'Cacao en Polvo',
      categoria: 'Endulzantes',
      precioCompra: 22.00,
      precioVenta: 30.00,
      cantidadActual: 9,
      cantidadMinima: 8,
      cantidadMaxima: 50,
      marca: 'CacaoReal',
      proveedor: 'Cacaoteros SA',
      codigoBarras: '7501234567896',
      fechaCaducidad: '2025-11-11',
      estado: 'orange'
    },
    {
      id: 8,
      nombre: 'Jarabe de Vainilla',
      categoria: 'Saborizantes',
      precioCompra: 18.00,
      precioVenta: 24.00,
      cantidadActual: 12,
      cantidadMinima: 6,
      cantidadMaxima: 40,
      marca: 'SweetShot',
      proveedor: 'Sabores del Sur',
      codigoBarras: '7501234567897',
      fechaCaducidad: '2026-02-28',
      estado: 'green'
    },
    {
      id: 9,
      nombre: 'Galletas Integrales',
      categoria: 'Panadería',
      precioCompra: 12.00,
      precioVenta: 18.00,
      cantidadActual: 6,
      cantidadMinima: 10,
      cantidadMaxima: 60,
      marca: 'BioBite',
      proveedor: 'Hornos Unidos',
      codigoBarras: '7501234567898',
      fechaCaducidad: '2024-12-03',
      estado: 'red'
    },
    {
      id: 10,
      nombre: 'Azúcar Morena',
      categoria: 'Endulzantes',
      precioCompra: 8.00,
      precioVenta: 12.00,
      cantidadActual: 35,
      cantidadMinima: 10,
      cantidadMaxima: 80,
      marca: 'Dulce Campo',
      proveedor: 'Endulzantes MX',
      codigoBarras: '7501234567899',
      fechaCaducidad: '2025-05-15',
      estado: 'green'
    },
    {
      id: 11,
      nombre: 'Leche Deslactosada',
      categoria: 'Lácteos',
      precioCompra: 16.00,
      precioVenta: 20.00,
      cantidadActual: 14,
      cantidadMinima: 15,
      cantidadMaxima: 50,
      marca: 'Lactosa Free',
      proveedor: 'Lácteos Nacionales',
      codigoBarras: '7501234567800',
      fechaCaducidad: '2024-08-22',
      estado: 'orange'
    },
    {
      id: 12,
      nombre: 'Café Descafeinado',
      categoria: 'Bebidas Calientes',
      precioCompra: 20.00,
      precioVenta: 27.00,
      cantidadActual: 7,
      cantidadMinima: 10,
      cantidadMaxima: 70,
      marca: 'Café del Valle',
      proveedor: 'Distribuidora Central',
      codigoBarras: '7501234567801',
      fechaCaducidad: '2025-01-10',
      estado: 'red'
    },
    {
      id: 13,
      nombre: 'Miel de Abeja',
      categoria: 'Endulzantes',
      precioCompra: 26.00,
      precioVenta: 34.00,
      cantidadActual: 18,
      cantidadMinima: 6,
      cantidadMaxima: 40,
      marca: 'Dulce Natural',
      proveedor: 'Apícolas del Norte',
      codigoBarras: '7501234567802',
      fechaCaducidad: '2026-06-30',
      estado: 'green'
    },
    {
      id: 14,
      nombre: 'Cápsulas Espresso',
      categoria: 'Bebidas Calientes',
      precioCompra: 28.00,
      precioVenta: 38.00,
      cantidadActual: 45,
      cantidadMinima: 15,
      cantidadMaxima: 120,
      marca: 'ShotCaps',
      proveedor: 'Distribuidora Central',
      codigoBarras: '7501234567803',
      fechaCaducidad: '2025-09-09',
      estado: 'green'
    },
    {
      id: 15,
      nombre: 'Sirope de Caramelo',
      categoria: 'Saborizantes',
      precioCompra: 15.00,
      precioVenta: 22.00,
      cantidadActual: 8,
      cantidadMinima: 10,
      cantidadMaxima: 50,
      marca: 'SweetShot',
      proveedor: 'Sabores del Sur',
      codigoBarras: '7501234567804',
      fechaCaducidad: '2026-03-18',
      estado: 'orange'
    },
    {
      id: 16,
      nombre: 'Servilletas Eco',
      categoria: 'Descartables',
      precioCompra: 6.00,
      precioVenta: 10.00,
      cantidadActual: 200,
      cantidadMinima: 80,
      cantidadMaxima: 300,
      marca: 'EcoPack',
      proveedor: 'Papelería Express',
      codigoBarras: '7501234567805',
      fechaCaducidad: '2028-01-01',
      estado: 'green'
    },
    {
      id: 17,
      nombre: 'Popotes Biodegradables',
      categoria: 'Descartables',
      precioCompra: 9.00,
      precioVenta: 13.00,
      cantidadActual: 40,
      cantidadMinima: 30,
      cantidadMaxima: 120,
      marca: 'EcoPack',
      proveedor: 'Papelería Express',
      codigoBarras: '7501234567806',
      fechaCaducidad: '2028-01-01',
      estado: 'green'
    },
    {
      id: 18,
      nombre: 'Pan Baguette',
      categoria: 'Panadería',
      precioCompra: 7.00,
      precioVenta: 11.00,
      cantidadActual: 5,
      cantidadMinima: 12,
      cantidadMaxima: 50,
      marca: 'Pan Fresco',
      proveedor: 'Panadería Central',
      codigoBarras: '7501234567807',
      fechaCaducidad: '2024-04-12',
      estado: 'red'
    },
    {
      id: 19,
      nombre: 'Yerba Mate',
      categoria: 'Bebidas Calientes',
      precioCompra: 12.00,
      precioVenta: 17.00,
      cantidadActual: 22,
      cantidadMinima: 8,
      cantidadMaxima: 60,
      marca: 'HerbalMix',
      proveedor: 'Infusiones MX',
      codigoBarras: '7501234567808',
      fechaCaducidad: '2026-10-10',
      estado: 'green'
    },
    {
      id: 20,
      nombre: 'Stevia Natural',
      categoria: 'Endulzantes',
      precioCompra: 11.00,
      precioVenta: 16.00,
      cantidadActual: 13,
      cantidadMinima: 10,
      cantidadMaxima: 70,
      marca: 'Dulce Plus',
      proveedor: 'Endulzantes MX',
      codigoBarras: '7501234567809',
      fechaCaducidad: '2026-01-25',
      estado: 'orange'
    },
    {
      id: 21,
      nombre: 'Café Orgánico',
      categoria: 'Bebidas Calientes',
      precioCompra: 24.00,
      precioVenta: 32.00,
      cantidadActual: 55,
      cantidadMinima: 20,
      cantidadMaxima: 120,
      marca: 'Café del Valle',
      proveedor: 'Distribuidora Central',
      codigoBarras: '7501234567810',
      fechaCaducidad: '2025-12-12',
      estado: 'green'
    },
    {
      id: 22,
      nombre: 'Chocolate Amargo',
      categoria: 'Panadería',
      precioCompra: 19.00,
      precioVenta: 26.00,
      cantidadActual: 10,
      cantidadMinima: 12,
      cantidadMaxima: 80,
      marca: 'BioBite',
      proveedor: 'Hornos Unidos',
      codigoBarras: '7501234567811',
      fechaCaducidad: '2025-02-02',
      estado: 'orange'
    },
    {
      id: 23,
      nombre: 'Jarabe de Avellana',
      categoria: 'Saborizantes',
      precioCompra: 17.00,
      precioVenta: 23.00,
      cantidadActual: 16,
      cantidadMinima: 10,
      cantidadMaxima: 50,
      marca: 'SweetShot',
      proveedor: 'Sabores del Sur',
      codigoBarras: '7501234567812',
      fechaCaducidad: '2026-04-04',
      estado: 'green'
    },
    {
      id: 24,
      nombre: 'Azúcar Glas',
      categoria: 'Endulzantes',
      precioCompra: 9.50,
      precioVenta: 13.00,
      cantidadActual: 4,
      cantidadMinima: 8,
      cantidadMaxima: 40,
      marca: 'Dulce Campo',
      proveedor: 'Endulzantes MX',
      codigoBarras: '7501234567813',
      fechaCaducidad: '2025-07-07',
      estado: 'red'
    },
    {
      id: 25,
      nombre: 'Té Chai',
      categoria: 'Bebidas Calientes',
      precioCompra: 13.00,
      precioVenta: 18.00,
      cantidadActual: 27,
      cantidadMinima: 10,
      cantidadMaxima: 90,
      marca: 'HerbalMix',
      proveedor: 'Infusiones MX',
      codigoBarras: '7501234567814',
      fechaCaducidad: '2026-08-18',
      estado: 'green'
    }
  ]);

  useEffect(() => {
    try {
      localStorage.setItem('inventarioBase', JSON.stringify(inventario));
    } catch {}
  }, [inventario]);

  useEffect(() => {
    setInventario(prev => prev.map(p => ({
      ...p,
      sucursal: p.sucursal || sucursalesBase[((p.id || 1) - 1) % sucursalesBase.length].name
    })));
  }, [sucursalesBase]);

  // Estado de filtros de búsqueda
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  // Estado de ordenamiento
  const [sortBy, setSortBy] = useState('nombre'); // clave de ordenamiento
  const [sortDir, setSortDir] = useState('asc'); // 'asc' | 'desc'

  // Estado para edición/ajuste
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);
  const [mostrarPrecios, setMostrarPrecios] = useState(false);
  const [mostrarStock, setMostrarStock] = useState(false);
  const [mostrarAbastecimiento, setMostrarAbastecimiento] = useState(false);
  const [mostrarProveedorAsignar, setMostrarProveedorAsignar] = useState(false);
  const [ordenesAbastecimiento, setOrdenesAbastecimiento] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [compact, setCompact] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [showMarca, setShowMarca] = useState(true);
  const [showProveedor, setShowProveedor] = useState(true);

  // Obtener categorías únicas para el filtro
  const categorias = [...new Set(inventario.map(item => item.categoria))];

  // Resumen por sucursal: porcentaje real de ocupación y estado visual
  const sucursalesResumen = useMemo(() => {
    const calcPercent = (name) => {
      const items = inventario.filter(p => (p.sucursal || sucursalesBase[((p.id || 1) - 1) % sucursalesBase.length].name) === name);
      const totalAct = items.reduce((acc, it) => acc + (Number(it.cantidadActual) || 0), 0);
      const totalMax = items.reduce((acc, it) => acc + (Number(it.cantidadMaxima) || 0), 0);
      if (totalMax <= 0) return 0;
      const pct = 100 * totalAct / totalMax;
      return Math.max(0, Math.min(100, pct));
    };
    const statusBy = (p) => (p >= 60 ? 'green' : p >= 30 ? 'orange' : 'red');
    return sucursalesBase.map(s => {
      const p = Math.round(calcPercent(s.name));
      return { id: s.id, name: s.name, stockPercent: p, status: statusBy(p) };
    });
  }, [inventario, sucursalesBase]);

  // Fuente de proveedores: localStorage (desde vista Proveedores) o vacío
  const proveedoresData = useMemo(() => {
    const saved = localStorage.getItem('proveedores');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);
  const proveedoresNombres = useMemo(() => {
    if (Array.isArray(proveedoresData) && proveedoresData.length) {
      return proveedoresData.map(p => p.nombre).filter(Boolean);
    }
    return [...new Set(inventario.map(i => i.proveedor).filter(Boolean))];
  }, [proveedoresData, inventario]);

  // Cálculo de estado visual según cantidades
  const calcularEstado = (cantidadActual, cantidadMinima, cantidadMaxima) => {
    if (cantidadActual <= cantidadMinima) return 'red';
    if (cantidadActual <= Math.max(cantidadMinima * 1.5, cantidadMaxima * 0.3)) return 'orange';
    return 'green';
  };

  // Filtrado + Ordenamiento (memoizado para rendimiento)
  const inventarioFiltrado = useMemo(() => {
    const filtrado = inventario.filter(item =>
      item.nombre.toLowerCase().includes(filtro.toLowerCase()) &&
      (categoriaFiltro === '' || item.categoria === categoriaFiltro)
    );

    const sorted = [...filtrado].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      const va = a[sortBy];
      const vb = b[sortBy];
      if (typeof va === 'string' && typeof vb === 'string') {
        return va.localeCompare(vb) * dir;
      }
      if (typeof va === 'number' && typeof vb === 'number') {
        return (va - vb) * dir;
      }
      return String(va).localeCompare(String(vb)) * dir;
    });
    return sorted;
  }, [inventario, filtro, categoriaFiltro, sortBy, sortDir]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtro, categoriaFiltro, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(inventarioFiltrado.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const inventarioPaginado = inventarioFiltrado.slice(startIndex, startIndex + pageSize);

  const goFirst = () => setCurrentPage(1);
  const goPrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const goNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const goLast = () => setCurrentPage(totalPages);
  const goToPage = (n) => {
    const num = Math.max(1, Math.min(totalPages, Number(n) || 1));
    setCurrentPage(num);
  };

  const [banner, setBanner] = useState(null);
  const [accionesPulse, setAccionesPulse] = useState(false);
  const showBanner = (type, text) => {
    setBanner({ type, text });
    setTimeout(() => setBanner(null), 3500);
  };

  const exportCSV = (filename, headers, rows) => {
    const escape = (val) => (
      val == null ? '' : String(val).includes(',') || String(val).includes('"') || String(val).includes('\n')
        ? '"' + String(val).replace(/"/g, '""') + '"'
        : String(val)
    );
    const csv = [headers.join(',')]
      .concat(rows.map(r => headers.map(h => escape(r[h])).join(',')))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (productoSeleccionadoId) {
      setAccionesPulse(true);
      const t = setTimeout(() => setAccionesPulse(false), 900);
      return () => clearTimeout(t);
    } else {
      setAccionesPulse(false);
    }
  }, [productoSeleccionadoId]);

  // Calcular estadísticas
  const estadisticas = {
    totalProductos: inventario.length,
    bajoStock: inventario.filter(item => item.estado === 'red').length,
    stockOptimo: inventario.filter(item => item.estado === 'green').length,
    stockMedio: inventario.filter(item => item.estado === 'orange').length
  };

  // Colores para badges de estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'green': return '#4CAF50';
      case 'orange': return '#FF9800';
      case 'red': return '#F44336';
      default: return '#757575';
    }
  };

  const Donut = ({ percent, color }) => {
    const radius = 36;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const clamped = Math.min(Math.max(percent, 0), 100);
    const dashOffset = circumference * (1 - clamped / 100);
    return (
      <svg className="donut" width="90" height="90">
        <circle cx="45" cy="45" r={normalizedRadius} fill="transparent" stroke="#ffffff55" strokeWidth={stroke} />
        <circle
          cx="45"
          cy="45"
          r={normalizedRadius}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="donut-text">
          {Math.round(clamped)}%
        </text>
      </svg>
    );
  };

  // Texto legible del estado basado en cantidades actuales
  const getEstadoTexto = (item) => {
    if (item.cantidadActual <= item.cantidadMinima) return 'Stock Crítico';
    if (item.cantidadActual >= item.cantidadMaxima * 0.8) return 'Stock Máximo';
    return 'Stock Normal';
  };

  // Cambiar criterio de ordenamiento
  const cambiarOrden = (clave) => {
    if (sortBy === clave) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(clave);
      setSortDir('asc');
    }
  };

  const renderTh = (clave, etiqueta) => (
    <th
      onClick={() => cambiarOrden(clave)}
      title={`Ordenar por ${etiqueta}`}
    >
      <span className="th-label">
        {etiqueta}
        <span className={`th-icon ${sortBy === clave ? 'active' : ''}`}>
          {sortBy === clave ? (sortDir === 'asc' ? '↑' : '↓') : '⇅'}
        </span>
      </span>
    </th>
  );

  // Abrir y cerrar modales
  

  const abrirPrecios = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarPrecios(true);
  };

  const abrirStock = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarStock(true);
  };

  const abrirAbastecimiento = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarAbastecimiento(true);
  };

  const cerrarModales = () => {
    setProductoSeleccionado(null);
    setMostrarPrecios(false);
    setMostrarStock(false);
    setMostrarAbastecimiento(false);
    setMostrarProveedorAsignar(false);
  };

  // Persistir cambios de edición
  

  const guardarPrecios = (datos) => {
    setInventario(prev => prev.map(p => {
      if (p.id !== productoSeleccionado.id) return p;
      const actualizado = { ...p, precioCompra: datos.precioCompra, precioVenta: datos.precioVenta };
      const nuevoEstado = calcularEstado(actualizado.cantidadActual, actualizado.cantidadMinima, actualizado.cantidadMaxima);
      return { ...actualizado, estado: nuevoEstado };
    }));
    cerrarModales();
  };

  const guardarStock = (datos) => {
    setInventario(prev => prev.map(p => {
      if (p.id !== productoSeleccionado.id) return p;
      const actualizado = { ...p, cantidadMinima: datos.cantidadMinima, cantidadMaxima: datos.cantidadMaxima };
      const nuevoEstado = calcularEstado(actualizado.cantidadActual, actualizado.cantidadMinima, actualizado.cantidadMaxima);
      return { ...actualizado, estado: nuevoEstado };
    }));
    cerrarModales();
  };

  const guardarAbastecimiento = (datos) => {
    setOrdenesAbastecimiento(prev => [
      ...prev,
      {
        id: Date.now(),
        productoId: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        proveedor: productoSeleccionado.proveedor,
        cantidadSolicitada: datos.cantidadSolicitada,
        fechaEsperada: datos.fechaEsperada,
        notas: datos.notas || '',
        estado: 'Pendiente'
      }
    ]);
    cerrarModales();
  };

  const abrirAsignarProveedor = (p) => {
    setProductoSeleccionado(p);
    setMostrarProveedorAsignar(true);
  };

  const guardarProveedorAsignado = (nombreProveedor) => {
    setInventario(prev => prev.map(prod => {
      if (prod.id !== productoSeleccionado.id) return prod;
      return { ...prod, proveedor: nombreProveedor || '' };
    }));
    cerrarModales();
    showBanner('success', 'Proveedor asignado');
  };

  return (
    <div className="inventario-container">
      {!sucursalSeleccionada && (
        <div className="inventario-overview">
          <h1 className="inventario-title">Inventario por Sucursales</h1>
          <div className="overview-grid">
            {sucursalesResumen.map(s => (
              <div key={s.id} className="overview-card" onClick={() => setSucursalSeleccionada(s.name)} role="button" title={`Ver inventario de ${s.name}`}>
                <div className="overview-indicator" style={{ backgroundColor: getEstadoColor(s.status) }} />
                <Donut percent={s.stockPercent} color={getEstadoColor(s.status)} />
                <div className="overview-info">
                  <h3>{s.name}</h3>
                  <span style={{ color: getEstadoColor(s.status) }}>{s.stockPercent}% stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sucursalSeleccionada && (
      <>
      <div className="inventario-header">
        <div className="breadcrumb">
          <button className="breadcrumb-back" aria-label="Regresar" onClick={() => setSucursalSeleccionada(null)}>←</button>
          <button className="breadcrumb-link" onClick={() => setSucursalSeleccionada(null)}>Inventarios</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{sucursalSeleccionada}</span>
        </div>
        <h1>Control de Inventario - {sucursalSeleccionada}</h1>
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
        <div className="orden-indicador">
          <span>Orden: {sortBy} ({sortDir})</span>
        </div>
      </div>

      <div className={`acciones-seleccion ${productoSeleccionadoId ? 'activo' : ''}`} role="region" aria-label="Acciones para el producto seleccionado">
        <span className="acciones-help">
          {productoSeleccionadoId ? 'Acciones para el producto seleccionado' : 'Selecciona un producto para habilitar acciones'}
        </span>
        <button
          className={`btn-precios ${accionesPulse ? 'pulse' : ''}`}
          title="Actualizar precios de compra/venta"
          aria-label="Actualizar precios"
          onClick={() => abrirPrecios(inventario.find(p => p.id === productoSeleccionadoId))}
          disabled={!productoSeleccionadoId}
        >
          💵 Actualizar precios
        </button>
        <button
          className={`btn-ajuste ${accionesPulse ? 'pulse' : ''}`}
          title="Modificar niveles mínimos y máximos"
          aria-label="Modificar niveles"
          onClick={() => abrirStock(inventario.find(p => p.id === productoSeleccionadoId))}
          disabled={!productoSeleccionadoId}
        >
          📏 Modificar niveles
        </button>
        <button
          className={`btn-abastecimiento ${accionesPulse ? 'pulse' : ''}`}
          title="Crear orden de abastecimiento"
          aria-label="Crear orden de abastecimiento"
          onClick={() => abrirAbastecimiento(inventario.find(p => p.id === productoSeleccionadoId))}
          disabled={!productoSeleccionadoId}
        >
          📦 Abastecimiento
        </button>
        <button
          className={`btn-ajuste ${accionesPulse ? 'pulse' : ''}`}
          title="Asignar proveedor al producto"
          aria-label="Asignar proveedor"
          onClick={() => abrirAsignarProveedor(inventario.find(p => p.id === productoSeleccionadoId))}
          disabled={!productoSeleccionadoId}
        >
          🤝 Asignar proveedor
        </button>
        <div className="acciones-export">
          <button
            className="btn-control"
            title="Exportar productos a CSV"
            aria-label="Exportar productos CSV"
            onClick={() => exportCSV(
              'productos.csv',
              ['nombre','categoria','precioCompra','precioVenta','cantidadActual','cantidadMinima','cantidadMaxima','estado','marca','proveedor'],
              inventarioFiltrado
            )}
          >
            Exportar Productos CSV
          </button>
          <button
            className="btn-control"
            title="Exportar órdenes a CSV"
            aria-label="Exportar órdenes CSV"
            onClick={() => exportCSV(
              'ordenes_abastecimiento.csv',
              ['nombre','proveedor','cantidadSolicitada','fechaEsperada','estado','notas'],
              ordenesAbastecimiento
            )}
            disabled={!ordenesAbastecimiento.length}
          >
            Exportar Órdenes CSV
          </button>
        </div>
      </div>

      {banner && (
        <div className={`banner banner-${banner.type}`} role="status" aria-live="polite">{banner.text}</div>
      )}

      {/* Controles de Tabla */}
      <div className="tabla-controles" role="region" aria-label="Controles de tabla">
        <div className="grupo-controles">
          <span className="control-label">Tamaño página:</span>
          <div className="btn-group">
            {[10, 25, 50, 100].map(sz => (
              <button
                key={sz}
                className={`btn-control ${pageSize === sz ? 'active' : ''}`}
                onClick={() => { setPageSize(sz); setCurrentPage(1); }}
                aria-label={`Mostrar ${sz} filas por página`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
        <div className="grupo-controles">
          <span className="control-label">Vista:</span>
          <div className="btn-group">
            <button className={`btn-control ${compact ? 'active' : ''}`} onClick={() => setCompact(v => !v)}>Compacta</button>
            <button className={`btn-control ${stickyHeader ? 'active' : ''}`} onClick={() => setStickyHeader(v => !v)}>Encabezado fijo</button>
          </div>
        </div>
        <div className="grupo-controles">
          <span className="control-label">Columnas:</span>
          <div className="btn-group">
            <button className={`btn-control ${showMarca ? 'active' : ''}`} onClick={() => setShowMarca(v => !v)}>Marca</button>
            <button className={`btn-control ${showProveedor ? 'active' : ''}`} onClick={() => setShowProveedor(v => !v)}>Proveedor</button>
          </div>
        </div>
        <div className="grupo-controles paginacion">
          <button className="btn-control" onClick={goFirst} disabled={currentPage === 1}>Primero</button>
          <button className="btn-control" onClick={goPrev} disabled={currentPage === 1}>Anterior</button>
          <span className="pagina-info">Página {currentPage} de {totalPages}</span>
          <button className="btn-control" onClick={goNext} disabled={currentPage === totalPages}>Siguiente</button>
          <button className="btn-control" onClick={goLast} disabled={currentPage === totalPages}>Último</button>
          <label className="ir-pagina">
            Ir a
            <input type="number" min="1" max={totalPages} defaultValue={currentPage} onBlur={(e) => goToPage(e.target.value)} aria-label="Ir a página" />
          </label>
        </div>
      </div>

      {/* Tabla de Inventario */}
      <div className={`tabla-container ${stickyHeader ? 'sticky' : ''}`}>
        <table className={`inventario-table ${compact ? 'compact' : ''} ${stickyHeader ? 'sticky' : ''}`}>
          <thead>
            <tr>
              <th>
                <span className="th-label">Sel</span>
              </th>
              {renderTh('nombre', 'Producto')}
              {renderTh('categoria', 'Categoría')}
              {renderTh('precioCompra', 'Precio Compra')}
              {renderTh('precioVenta', 'Precio Venta')}
              {renderTh('cantidadActual', 'Stock Actual')}
              <th title="Rango recomendado">
                <span className="th-label">
                  Stock Mín/Máx
                  <span className="th-icon hint">ℹ︎</span>
                </span>
              </th>
              <th title="Estado calculado por cantidades">
                <span className="th-label">
                  Estado
                  <span className="th-icon hint">ℹ︎</span>
                </span>
              </th>
              {showMarca && renderTh('marca', 'Marca')}
              {showProveedor && renderTh('proveedor', 'Proveedor')}
            </tr>
          </thead>
          <tbody>
            {inventarioPaginado.map(producto => (
              <tr key={producto.id} className={`fila-estado-${producto.estado}`}>
                <td>
                  <label className="sel-label" title="Seleccionar este producto">
                    <input
                      type="checkbox"
                      checked={productoSeleccionadoId === producto.id}
                      onChange={(e) => {
                        setProductoSeleccionadoId(e.target.checked ? producto.id : null);
                      }}
                      aria-label={`Seleccionar ${producto.nombre}`}
                    />
                    <span>Seleccionar</span>
                  </label>
                </td>
                <td>
                  <div className="producto-info">
                    <strong>{producto.nombre}</strong>
                    <small>{producto.codigoBarras}</small>
                  </div>
                </td>
                <td>{producto.categoria}</td>
                <td>${producto.precioCompra.toFixed(2)}</td>
                <td>${producto.precioVenta.toFixed(2)}</td>
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
                {showMarca && <td>{producto.marca}</td>}
                {showProveedor && <td>{producto.proveedor}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="leyenda-stock" aria-label="Leyenda de estados de stock">
        <span><span className="legend-dot verde">●</span> Óptimo</span>
        <span><span className="legend-dot naranja">●</span> Medio</span>
        <span><span className="legend-dot rojo">●</span> Bajo/Crítico</span>
      </div>

      {ordenesAbastecimiento.length > 0 && (
        <div className="ordenes-container">
          <h3>Órdenes de abastecimiento</h3>
          <table className="inventario-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Proveedor</th>
                <th>Cantidad</th>
                <th>Fecha esperada</th>
                <th>Estado</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              {ordenesAbastecimiento.map(o => (
                <tr key={o.id}>
                  <td>{o.nombre}</td>
                  <td>{o.proveedor}</td>
                  <td>{o.cantidadSolicitada}</td>
                  <td>{o.fechaEsperada}</td>
                  <td><span className="estado-orden-badge pendiente">{o.estado}</span></td>
                  <td>{o.notas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      
      {/* Modal de Actualización de Precios */}
      {mostrarPrecios && productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModales}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Actualizar precios</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const datos = {
                  precioCompra: parseFloat(form.precioCompra.value),
                  precioVenta: parseFloat(form.precioVenta.value),
                };
                const resumen = `Confirmar actualización de precios\n\nProducto: ${productoSeleccionado.nombre}\nCompra: $${datos.precioCompra.toFixed(2)}\nVenta: $${datos.precioVenta.toFixed(2)}`;
                if (!window.confirm(resumen)) return;
                guardarPrecios(datos);
                showBanner('success', 'Precios actualizados correctamente');
              }}
            >
              <div className="form-grid">
                <label>
                  Precio compra
                  <input name="precioCompra" type="number" step="0.01" defaultValue={productoSeleccionado.precioCompra} required />
                </label>
                <label>
                  Precio venta
                  <input name="precioVenta" type="number" step="0.01" defaultValue={productoSeleccionado.precioVenta} required />
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={cerrarModales}>Cancelar</button>
                <button type="submit" className="btn-guardar">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarStock && productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModales}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Actualizar mínimos y máximos</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const datos = {
                  cantidadMinima: parseInt(form.cantidadMinima.value, 10),
                  cantidadMaxima: parseInt(form.cantidadMaxima.value, 10),
                };
                const resumen = `Confirmar modificación de niveles\n\nProducto: ${productoSeleccionado.nombre}\nMínimo: ${datos.cantidadMinima}\nMáximo: ${datos.cantidadMaxima}`;
                if (!window.confirm(resumen)) return;
                guardarStock(datos);
                showBanner('success', 'Niveles modificados correctamente');
              }}
            >
              <div className="form-grid">
                <label>
                  Stock mínimo
                  <input name="cantidadMinima" type="number" defaultValue={productoSeleccionado.cantidadMinima} required />
                </label>
                <label>
                  Stock máximo
                  <input name="cantidadMaxima" type="number" defaultValue={productoSeleccionado.cantidadMaxima} required />
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={cerrarModales}>Cancelar</button>
                <button type="submit" className="btn-guardar">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarProveedorAsignar && productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModales}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Asignar proveedor</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const nombre = form.proveedorSel.value;
                guardarProveedorAsignado(nombre);
              }}
            >
              <div className="form-grid">
                <label>
                  Proveedor
                  <select name="proveedorSel" defaultValue={productoSeleccionado.proveedor || ''}>
                    <option value="">Sin proveedor</option>
                    {proveedoresNombres.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={cerrarModales}>Cancelar</button>
                <button type="submit" className="btn-guardar">Guardar</button>
              </div>
            </form>
            <div className="acciones-help">Gestiona proveedores desde el menú lateral</div>
          </div>
        </div>
      )}

      {mostrarAbastecimiento && productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModales}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Orden de abastecimiento</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const datos = {
                  cantidadSolicitada: parseInt(form.cantidadSolicitada.value, 10),
                  fechaEsperada: form.fechaEsperada.value,
                  notas: form.notas.value,
                };
                const resumen = `Confirmar orden de abastecimiento\n\nProducto: ${productoSeleccionado.nombre}\nCantidad: ${datos.cantidadSolicitada}\nFecha esperada: ${datos.fechaEsperada}\nNotas: ${datos.notas || '-'}`;
                if (!window.confirm(resumen)) return;
                guardarAbastecimiento(datos);
                showBanner('success', 'Orden de abastecimiento creada');
              }}
            >
              <div className="form-grid">
                <label>
                  Cantidad a solicitar
                  <input name="cantidadSolicitada" type="number" min="1" defaultValue={productoSeleccionado.cantidadMinima} required />
                </label>
                <label>
                  Fecha esperada
                  <input name="fechaEsperada" type="date" required />
                </label>
                <label>
                  Notas
                  <input name="notas" placeholder="Observaciones" />
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={cerrarModales}>Cancelar</button>
                <button type="submit" className="btn-guardar">Guardar</button>
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

export default Inventario;