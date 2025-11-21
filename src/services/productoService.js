import api from './api';

export const productoService = {
  // Obtener todos los productos
  obtenerProductos: async () => {
    try {
      const response = await api.get('/api/productos');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener productos: ' + error.message);
    }
  },

  // Obtener producto por ID
  obtenerProductoPorId: async (id) => {
    try {
      const response = await api.get(`/api/productos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener producto: ' + error.message);
    }
  },

  // Crear producto (admin)
  crearProducto: async (productoData) => {
    try {
      const response = await api.post('/api/productos', productoData);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear producto: ' + error.message);
    }
  },

  // Actualizar producto (admin)
  actualizarProducto: async (id, productoData) => {
    try {
      const response = await api.put(`/api/productos/${id}`, productoData);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar producto: ' + error.message);
    }
  },

  // Eliminar producto (admin)
  eliminarProducto: async (id) => {
    try {
      const response = await api.delete(`/api/productos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar producto: ' + error.message);
    }
  }
};