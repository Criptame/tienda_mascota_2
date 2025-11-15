import React, { createContext, useState, useContext } from 'react';

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

  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const estaAutenticado = () => {
    return usuario !== null;
  };

  React.useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const value = {
    usuario,
    login,
    logout,
    estaAutenticado
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };