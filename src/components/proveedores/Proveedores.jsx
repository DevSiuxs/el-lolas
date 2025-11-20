import React, { useEffect, useMemo, useState } from 'react';
import './Proveedores.css';

const initialProveedores = [
  { id: 1, nombre: 'Distribuidora Central', contacto: 'Juan Pérez', telefono: '55 1234 5678', correo: 'ventas@distcentral.mx', direccion: 'Av. Principal 123, CDMX', notas: '' },
  { id: 2, nombre: 'Sabores del Sur', contacto: 'María López', telefono: '55 2345 6789', correo: 'contacto@saboresdelsur.mx', direccion: 'Calle Sabor 45, CDMX', notas: '' },
  { id: 3, nombre: 'Papelería Express', contacto: 'Carlos Núñez', telefono: '55 3456 7890', correo: 'ventas@papexpress.mx', direccion: 'Insurgentes 890, CDMX', notas: '' },
  { id: 4, nombre: 'Apícolas del Norte', contacto: 'Ana García', telefono: '55 4567 8901', correo: 'ventas@apicolasnorte.mx', direccion: 'Ruta 7, Monterrey', notas: '' }
];

// Vista de Proveedores:
// - CRUD completo: crear, editar (incluye renombrar), eliminar
// - Filtro por nombre/contacto/correo/teléfono
// - Persistencia en localStorage
const Proveedores = () => {
  const [proveedores, setProveedores] = useState(() => {
    const saved = localStorage.getItem('proveedores');
    return saved ? JSON.parse(saved) : initialProveedores;
  });
  const [filtro, setFiltro] = useState('');
  const [modalNuevo, setModalNuevo] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formNuevo, setFormNuevo] = useState({ nombre: '', contacto: '', telefono: '', correo: '', direccion: '', notas: '' });
  const [editForm, setEditForm] = useState({ nombre: '', contacto: '', telefono: '', correo: '', direccion: '', notas: '' });

  useEffect(() => {
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
  }, [proveedores]);

  // Filtro de proveedores por texto
  const proveedoresFiltrados = useMemo(() => {
    const q = filtro.trim().toLowerCase();
    if (!q) return proveedores;
    return proveedores.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.contacto.toLowerCase().includes(q) ||
      p.telefono.toLowerCase().includes(q) ||
      p.correo.toLowerCase().includes(q)
    );
  }, [proveedores, filtro]);

  const abrirNuevo = () => {
    setFormNuevo({ nombre: '', contacto: '', telefono: '', correo: '', direccion: '', notas: '' });
    setModalNuevo(true);
  };
  const cerrarNuevo = () => setModalNuevo(false);

  // Crear proveedor
  const crearProveedor = (e) => {
    e.preventDefault();
    const datos = { ...formNuevo };
    if (!datos.nombre.trim()) return;
    const id = Date.now();
    setProveedores(prev => [{ id, ...datos }, ...prev]);
    setModalNuevo(false);
  };

  // Iniciar edición (inline) de un proveedor
  const iniciarEdicion = (p) => {
    setEditId(p.id);
    setEditForm({ nombre: p.nombre, contacto: p.contacto, telefono: p.telefono, correo: p.correo, direccion: p.direccion, notas: p.notas || '' });
  };
  const cancelarEdicion = () => {
    setEditId(null);
  };
  const guardarEdicion = () => {
    setProveedores(prev => prev.map(p => (p.id === editId ? { ...p, ...editForm } : p)));
    setEditId(null);
  };

  // Eliminar proveedor
  const eliminarProveedor = (id) => {
    if (!window.confirm('¿Eliminar proveedor?')) return;
    setProveedores(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="proveedores-page">
      <div className="proveedores-header">
        <h1>Proveedores</h1>
        <div className="acciones">
          <input
            type="text"
            className="input-buscar"
            placeholder="Buscar por nombre, contacto, correo"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <button className="btn-primario" onClick={abrirNuevo}>Nuevo Proveedor</button>
        </div>
      </div>

      <div className="tabla-wrapper">
        <table className="tabla-proveedores">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedoresFiltrados.map(p => (
              <tr key={p.id}>
                <td>
                  {editId === p.id ? (
                    <input value={editForm.nombre} onChange={(e) => setEditForm(f => ({ ...f, nombre: e.target.value }))} />
                  ) : (
                    <span className="cell-strong">{p.nombre}</span>
                  )}
                </td>
                <td>
                  {editId === p.id ? (
                    <input value={editForm.contacto} onChange={(e) => setEditForm(f => ({ ...f, contacto: e.target.value }))} />
                  ) : (
                    p.contacto || '-'
                  )}
                </td>
                <td>
                  {editId === p.id ? (
                    <input value={editForm.telefono} onChange={(e) => setEditForm(f => ({ ...f, telefono: e.target.value }))} />
                  ) : (
                    p.telefono || '-'
                  )}
                </td>
                <td>
                  {editId === p.id ? (
                    <input value={editForm.correo} onChange={(e) => setEditForm(f => ({ ...f, correo: e.target.value }))} />
                  ) : (
                    p.correo || '-'
                  )}
                </td>
                <td>
                  {editId === p.id ? (
                    <input value={editForm.direccion} onChange={(e) => setEditForm(f => ({ ...f, direccion: e.target.value }))} />
                  ) : (
                    p.direccion || '-'
                  )}
                </td>
                <td>
                  {editId === p.id ? (
                    <input value={editForm.notas} onChange={(e) => setEditForm(f => ({ ...f, notas: e.target.value }))} />
                  ) : (
                    p.notas || '-'
                  )}
                </td>
                <td className="acciones-cell">
                  {editId === p.id ? (
                    <>
                      <button className="btn-guardar" onClick={guardarEdicion}>Guardar</button>
                      <button className="btn-cancelar" onClick={cancelarEdicion}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="btn-accion" onClick={() => iniciarEdicion(p)}>Editar</button>
                      <button className="btn-peligro" onClick={() => eliminarProveedor(p.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {proveedoresFiltrados.length === 0 && (
              <tr>
                <td colSpan="7" className="empty">Sin resultados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalNuevo && (
        <div className="modal-overlay" onClick={cerrarNuevo}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Nuevo Proveedor</h3>
            <form onSubmit={crearProveedor} className="form-grid">
              <label>
                Nombre
                <input value={formNuevo.nombre} onChange={(e) => setFormNuevo(f => ({ ...f, nombre: e.target.value }))} required />
              </label>
              <label>
                Contacto
                <input value={formNuevo.contacto} onChange={(e) => setFormNuevo(f => ({ ...f, contacto: e.target.value }))} />
              </label>
              <label>
                Teléfono
                <input value={formNuevo.telefono} onChange={(e) => setFormNuevo(f => ({ ...f, telefono: e.target.value }))} />
              </label>
              <label>
                Correo
                <input type="email" value={formNuevo.correo} onChange={(e) => setFormNuevo(f => ({ ...f, correo: e.target.value }))} />
              </label>
              <label className="full">
                Dirección
                <input value={formNuevo.direccion} onChange={(e) => setFormNuevo(f => ({ ...f, direccion: e.target.value }))} />
              </label>
              <label className="full">
                Notas
                <input value={formNuevo.notas} onChange={(e) => setFormNuevo(f => ({ ...f, notas: e.target.value }))} />
              </label>
              <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={cerrarNuevo}>Cancelar</button>
                <button type="submit" className="btn-guardar">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proveedores;