import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    
    if (usuarioGuardado && token) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const iniciarSesion = (datosUsuario, token) => {
    setUsuario(datosUsuario);
    // Guardar en localStorage para persistencia
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    localStorage.setItem('token', token);
  };

  const registrarUsuario = (datosUsuario) => {
    // Simular registro - en una app real harías una petición a tu API
    const nuevoUsuario = {
      id: Date.now(),
      nombre: datosUsuario.nombre,
      email: datosUsuario.email,
      fechaRegistro: new Date().toISOString()
    };
    
    setUsuario(nuevoUsuario);
    // Guardar en localStorage
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    localStorage.setItem('token', 'token-simulado-' + Date.now());
    
    return Promise.resolve(nuevoUsuario);
  };

  const cerrarSesion = () => {
    setUsuario(null);
    // Limpiar localStorage
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  };

  const actualizarPerfil = (nuevosDatos) => {
    const usuarioActualizado = { ...usuario, ...nuevosDatos };
    setUsuario(usuarioActualizado);
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
  };

  const value = {
    usuario,
    cargando,
    iniciarSesion,
    registrarUsuario,
    cerrarSesion,
    actualizarPerfil
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };