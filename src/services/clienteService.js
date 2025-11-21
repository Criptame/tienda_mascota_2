import api from './api';

export const clienteService = {
  // Registrar nuevo cliente
  registrarCliente: async (clienteData) => {
    try {
      const response = await api.post('/api/clientes/registro', clienteData);
      return response.data;
    } catch (error) {
      throw new Error('Error al registrar cliente: ' + error.message);
    }
  },

  // Login de cliente
  loginCliente: async (credenciales) => {
    try {
      const response = await api.post('/api/clientes/login', credenciales);
      return response.data;
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message);
    }
  },

  // Obtener perfil del cliente
  obtenerPerfil: async () => {
    try {
      const response = await api.get('/api/clientes/perfil');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener perfil: ' + error.message);
    }
  },

  // Actualizar perfil del cliente
  actualizarPerfil: async (clienteData) => {
    try {
      const response = await api.put('/api/clientes/perfil', clienteData);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar perfil: ' + error.message);
    }
  }
};