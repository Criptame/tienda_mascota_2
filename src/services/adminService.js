import api from './api';

export const adminService = {
  // Login de administrador
  loginAdmin: async (credenciales) => {
    try {
      const response = await api.post('/api/admin/login', credenciales);
      return response.data;
    } catch (error) {
      throw new Error('Error al iniciar sesión como admin: ' + error.message);
    }
  },

  // Obtener estadísticas
  obtenerEstadisticas: async () => {
    try {
      const response = await api.get('/api/admin/estadisticas');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener estadísticas: ' + error.message);
    }
  }
};