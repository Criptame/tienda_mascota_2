import api from './api';

export const ventaService = {
  // Crear nueva venta
  crearVenta: async (ventaData) => {
    try {
      const response = await api.post('/api/ventas', ventaData);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear venta: ' + error.message);
    }
  },

  // Obtener historial de compras del cliente
  obtenerHistorialCompras: async () => {
    try {
      const response = await api.get('/api/ventas/mis-compras');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener historial: ' + error.message);
    }
  },

  // Obtener todas las ventas (admin)
  obtenerTodasVentas: async () => {
    try {
      const response = await api.get('/api/ventas');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener ventas: ' + error.message);
    }
  }
};