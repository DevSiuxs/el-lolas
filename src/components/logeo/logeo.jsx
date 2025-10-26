import React, { useState } from 'react';
import './logeo.css';

const Logeo = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    rol: 'usuario'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'El correo no es válido';
    }

    if (!formData.contraseña) {
      newErrors.contraseña = 'La contraseña es requerida';
    } else if (formData.contraseña.length < 6) {
      newErrors.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmarContraseña) {
      newErrors.confirmarContraseña = 'Confirma tu contraseña';
    } else if (formData.contraseña !== formData.confirmarContraseña) {
      newErrors.confirmarContraseña = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log('Datos del formulario:', formData);
      alert('Usuario registrado exitosamente');
      // Limpiar formulario después del envío
      setFormData({
        nombre: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
        rol: 'usuario'
      });
    }
  };

  return (
    <div className="logeo-container">
      <div className="logeo-card">
        <div className="logeo-header">
          <h2>Registro de Usuario</h2>
          <p>Crear nueva cuenta de usuario</p>
        </div>

        <form onSubmit={handleSubmit} className="logeo-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'error' : ''}
              placeholder="Ingresa tu nombre completo"
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className={errors.correo ? 'error' : ''}
              placeholder="Ingresa tu correo electrónico"
            />
            {errors.correo && <span className="error-message">{errors.correo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className={errors.contraseña ? 'error' : ''}
              placeholder="Crea una contraseña segura"
            />
            {errors.contraseña && <span className="error-message">{errors.contraseña}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmarContraseña">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarContraseña"
              name="confirmarContraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              className={errors.confirmarContraseña ? 'error' : ''}
              placeholder="Repite tu contraseña"
            />
            {errors.confirmarContraseña && (
              <span className="error-message">{errors.confirmarContraseña}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="rol">Rol de Usuario</label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="rol-select"
            >
              <option value="usuario">Usuario</option>
              <option value="operador">Operador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Registrar Usuario
          </button>
        </form>

        <div className="logeo-footer">
          <p>¿Ya tienes una cuenta? <a href="#login">Iniciar Sesión</a></p>
        </div>
      </div>
    </div>
  );
};

export default Logeo;