import React, { createContext, useState, useContext, useEffect } from 'react';
import { clienteService } from '../services/clienteService';
import { adminService } from '../services/adminService';

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

  const iniciarSesion = async (credenciales, esAdmin = false) => {
    try {
      let response;
      
      if (esAdmin) {
        response = await adminService.loginAdmin(credenciales);
      } else {
        response = await clienteService.loginCliente(credenciales);
      }

      const { usuario: userData, token } = response;
      
      setUsuario(userData);
      localStorage.setItem('usuario', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const registrarUsuario = async (datosUsuario) => {
    try {
      const response = await clienteService.registrarCliente(datosUsuario);
      const { usuario: userData, token } = response;
      
      setUsuario(userData);
      localStorage.setItem('usuario', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  };

  const actualizarPerfil = async (nuevosDatos) => {
    try {
      const usuarioActualizado = await clienteService.actualizarPerfil(nuevosDatos);
      setUsuario(usuarioActualizado);
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      return usuarioActualizado;
    } catch (error) {
      throw error;
    }
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